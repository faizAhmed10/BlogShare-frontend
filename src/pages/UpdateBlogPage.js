import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "../components/Popup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateBlogPage = () => {
  const { id } = useParams();

  let [message, setMessage] = useState(null);
  let [image, setImage] = useState(null);
  let [body, setBody] = useState("");
  let [title, setTitle] = useState("");
  let [sub_title, setSub_title] = useState("");

  let getMyBlog = async () => {
    try {
      let response = await fetch(`/api/blogs/getmyblog/${id}`);
      let data = await response.json();
      setBody(data.body);
      setTitle(data.title);
      setSub_title(data.sub_title);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };

  let updateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sub_title", sub_title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }
    try {
      let response = await fetch(`/api/blogs/updatemyblog/${id}/`, {
        method: "PUT",
        body: formData,
      });

      let data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyBlog();
  }, []);
  return (
    <div>
      {message ? <Popup detail={message} /> : null}
      <form className="flex flex-col w-[90%] mx-auto" onSubmit={updateBlog}>
        <h1 className="text-3xl my-5">Update your Blog</h1>
        <input
          placeholder="Title..."
          className="rounded border p-2 my-2 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Sub-Title..."
          className="rounded border p-2 my-2 bg-transparent"
          value={sub_title}
          onChange={(e) => setSub_title(e.target.value)}
        />

        <ReactQuill
          value={body}
          onChange={setBody}
          className="rounded p-2 my-2 bg-transparent border"
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
        />
        <label htmlFor="file">Select an image for your blog...</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="btn-hover bg-[#00C897] rounded w-[10%] p-1 mx-auto block my-2"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
