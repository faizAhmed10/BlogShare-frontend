import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import Popup from "../components/Popup";

const CreateBlog = () => {
    let token = JSON.parse(localStorage.getItem("authTokens"));
    let [message, setMessage] = useState(null);
    let [title, setTitle] = useState("");
    let [sub_title, setSub_title] = useState("");
    let [blog, setBlog] = useState("");
    let [image, setImage] = useState(null);

    const createBlog = async (e) => {
        e.preventDefault();
        if (title === "") {
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('sub_title', sub_title);
        formData.append('blog', blog);
        if (image) {
            formData.append('image', image);
        }

        try {
            let response = await fetch('/api/blogs/create/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.access}`,
                },
                body: formData,
            });
            let data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setMessage("Blog created successfully");
            } else {
                setMessage("Error creating blog");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            {message ? <Popup detail={message} /> : null}
            <form className="flex flex-col w-[90%] mx-auto" onSubmit={createBlog}>
                <h1 className="text-3xl my-5">Create a Blog</h1>
                <input
                    placeholder="Title..."
                    className="rounded border p-2 my-2 bg-transparent"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <input
                    placeholder="Sub-Title..."
                    className="rounded border p-2 my-2 bg-transparent"
                    onChange={(e) => setSub_title(e.target.value)}
                    value={sub_title}
                />
                <ReactQuill
                    value={blog}
                    onChange={setBlog}
                    className="rounded p-2 my-2 bg-transparent"
                    theme="snow"
                    modules={{
                        toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                            {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                        ],
                    }}
                />
                <label htmlFor="file">Select an image for your blog...</label>
                <input type="file" id="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit" className="btn-hover bg-[#00C897] rounded p-2 mx-auto block my-2">
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
