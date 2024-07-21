import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
const Navbar = () => {
  let { user, username } = useContext(AuthContext);

  return (
    <div className="w-full py-4 fixed top-0 nav">
      <nav className="flex items-center lg:ml-10
        
      " id="nav-bar">
        <h1 className="text-3xl" style={{
          fontFamily: "Lobster, sans-serif"
        }}>
          <NavLink to="/feed" activeclassname="active">BlogShare</NavLink>
        </h1>
        <ul className="flex flex-1 ml-5">
          <li className="lg:mx-2">
            <NavLink to="/create-blog" activeclassname="active">Create a blog</NavLink>
          </li>
          <li className="lg:mx-2">
            <NavLink to={`/my-blogs/${username}`} activeclassname="active">My blogs</NavLink>
          </li>
          <li className="lg:mx-2">
            <NavLink to={`/${username}`} activeclassname="active">My Profile</NavLink>
          </li>
        </ul>
        {!user ? (
          <Link to="/login" className="bg-[#00C897] px-4 rounded py-2">
            Login
          </Link>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
