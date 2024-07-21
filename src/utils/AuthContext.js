import { createContext, useEffect, useState } from "react";
import React from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  let [loading, setLoading] = useState(true);

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null
    );
    let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
    ? jwtDecode(localStorage.getItem("authTokens"))
    : null
    );
    let [username, setUsername] = useState(() => 
      user ? user.username : null
    )
  
  const registerUser = async (e) => {
    e.preventDefault();

    if (e.target.password.value !== e.target.confirmpassword.value) {
      alert("Passwords do not match, try again.");
      return;
    }

    let response = await fetch("/api/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();
    console.log(data)
    if (response.status === 200) {
      let response2 = await fetch("/api/user/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      let data2 = await response2.json();
      if (response2.status === 200) {
        setAuthTokens(data2);
        setUser(jwtDecode(data2.access));
        setUsername(e.target.username.value)
        localStorage.setItem("authTokens", JSON.stringify(data2));
        console.log("Registered!")
        navigate("/feed");
      } else {
        alert("Something went wrong");
      }
    } else {
      alert("Something went wrong");
    }
  };

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/user/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      setUsername(e.target.username.value)
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/feed");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let updateToken = async () => {
    if (!authTokens) {
      setLoading(false);
      return;
    }

    let response = await fetch("/api/user/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  const getReplies = async(blog_id) => {
    try{
      const response = await fetch(`/api/blogs/getreplies/${blog_id}/`,{
        headers:{
          Authorization: `Bearer ${authTokens.access}`
        },
      })
      let data = await response.json()
      return data
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const interval = setInterval(() => {
      if (authTokens) {
        const { exp } = jwtDecode(authTokens.access);
        const now = Math.floor(Date.now() / 1000);

        if (exp - now < 60) {
          updateToken();
        }
      }
    }, 1000 * 60); 

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  let contextData = {
    user: user,
    username: username,
    authTokens: authTokens,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,  
    getReplies: getReplies
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
