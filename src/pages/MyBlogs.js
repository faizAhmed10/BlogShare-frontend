import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../utils/AuthContext";
import MyBlog from "./MyBlog";
import { Link } from "react-router-dom";


const MyBlogs = () => {
  let { username } = useContext(AuthContext);
  let [myblogs, setMyBlogs] = useState([]);
  

  let getMyBlogs = async () => {
    try {
      let response = await fetch(`/api/blogs/getmyblogs/${username}/`);
      let data = await response.json();
      setMyBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      let response = await fetch(`/api/blogs/deletemyblog/${id}/`, {
        method: "DELETE",
      });
      let data = await response.json();
      console.log(data);
      getMyBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return (
    <div>
      
      {myblogs.length > 0 ? (
        <h1 className="text-4xl text-center my-5">Your Blogs</h1>
      ) : null}
      {myblogs.length > 0 ? (
        myblogs.map((blog, index) => (
          <MyBlog key={index} blog={blog} handleDelete={handleDelete} />
        ))
      ) : (
        <div className="h-[90dvh] flex items-center justify-center">
          <p className="text-center text-lg">
            You have not created any blogs yet.{" "}
            <Link className="text-[#00C897]" to={"/create-blog"}>
              Create your first Blog!
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
