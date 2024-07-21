import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  let [blog, setBlog] = useState([]);
  const getBlog = async () => {
    try {
      let response = await fetch(`/api/blogs/${id}`);
      let data = await response.json();
      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="lg:w-[70%] w-[95%] lg:ml-[10%] lg:mr-[40%] lg:my-7 mx-auto

    ">
      <div className="flex items-center my-2">
        {blog.user && <img
          className="max-w-[60px] min-h-[60px] mx-2 rounded-full"
          src={blog.user?.profile.profile_picture} alt="Profile"
        />}
        <p className="text-xl">
          {blog.user ? blog.user.username : "Username not available"}
        </p>
      </div>
      <div className="bg-white h-[1.5px] lg:w-[100%] w-[85%] lg:my-5 mx-auto"></div>
      <h1 className="lg:text-5xl text-4xl text-center my-3 font-semibold">{blog.title}</h1>
      <h2 className="text-2xl my-3 text-center">{blog.sub_title}</h2>
      {blog.image && <img
        src={blog.image}
        alt="Image loading..."
        className="max-h-[350px] w-full
        my-5
        "
      />}
      <div className="my-1 whitespace-pre-wrap break-words text-lg" dangerouslySetInnerHTML={{ __html: blog.body}}></div>
    </div>
  );
};

export default BlogPage;
