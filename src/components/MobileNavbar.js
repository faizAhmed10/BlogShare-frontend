import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../utils/AuthContext";
import createBLog from "../utils/assets/createblog.png";
import myBlogs from "../utils/assets/myblogs.png";
import userProfile from "../utils/assets/userprofile.png";
const MobileNavbar = () => {
  let { username } = useContext(AuthContext);
  return (
    <div>
      {username ? (
        <div className="w-full nav fixed bottom-0 border-t">
          <nav
            className="px-2" id="nav-bar-sm"
          >
            <ul className="flex my-1 justify-between">
              <li className="relative">
                <NavLink to="/create-blog" activeclassname="mo-active">
                  <div className="flex flex-col items-center hver">
                    <img src={createBLog} className="w-[30px] h-[30px] image" />
                    <p className="text-sm">Create a blog</p>
                  </div>
                </NavLink>
              </li>
              <li className="relative">
                <NavLink to={`/my-blogs/${username}`} activeclassname="mo-active">
                  <div className="flex flex-col items-center hver">
                    <img src={myBlogs} className="w-[30px] h-[30px]" />
                    <p className="text-sm">My blogs</p>
                  </div>
                </NavLink>
              </li>
              <li className="relative">
                <NavLink to={`/${username}`} activeclassname="mo-active">
                  <div className="flex flex-col items-center hver">
                    <img src={userProfile} className="w-[30px] h-[30px]" />
                    <p className="text-sm">My Profile</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNavbar;
