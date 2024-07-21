import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';
import ConfirmPopup from "../components/ConfirmPopup";

const MyBlog = ({blog, handleDelete}) => {

    let {getReplies} = useContext(AuthContext)
    let [replies, setReplies] = useState([])
    let [message, setMessage] = useState(null);

    const set = () => {
      setMessage("Are you sure you want to delete this blog?")
    }

    const confirmDelete = () => {
      handleDelete(blog.id);
      setMessage(null);
  }

  const cancelDelete = () => {
      setMessage(null);
  }
    useEffect(() => {
        const fetchReplies = async () => {
            const data = await getReplies(blog.id);
            setReplies(data);
        }
        fetchReplies()
    }, [blog.id])

    return (
        <div>
          {message ? <ConfirmPopup detail={message} func={confirmDelete} cancelFunc={cancelDelete}/> : null}
        <div className="bdr p-3 my-4 lg:w-3/4 w-[95%] mx-auto overflow-hidden rounded bg-[#343366]">
          <Link to={`/feed/blog/${blog.id}`}>
            <p className="text-xl">{blog.user.username}</p>
            <h2 className="lg:text-3xl text-2xl">{blog.title}</h2>
            <h3 className="lg:text-2xl text-xl my-1">{blog.sub_title}</h3>
            {blog.image && <img src={blog.image} className="rounded my-2"/>}
            </Link>
            <div className="my-1 whitespace-pre-wrap break-words text-lg" dangerouslySetInnerHTML={{ __html: blog.body.substring(0, 80)}}></div>
            <div>
                <p>upvotes: {blog.upvotes}</p>
                <p>downvotes : {blog.downvotes}</p>
            </div>
            <div>Replies</div>
            {replies && replies.length > 0 ? (
            replies.map((reply, index) => (
              <div key={index}>
                <p>
                  <span className="">
                    {reply.user ? reply.user.username : "username"}
                  </span>
                  :{" "}
                    <span>
                      {reply.reply}
                    </span>
                </p>
              </div>
            ))
          ) : (
            <p>No replies yet</p>
          )}

            <div className='lg:w-[18%] ml-auto my-1'>
            <Link to={`/update-blog/${blog.id}`} className='btn-hover bg-[#00C897] px-4 rounded py-2 mx-1'>Edit</Link>
            <button 
            onClick={set}
            className='bg-[#00C897] px-4 rounded py-2 mx-1 btn-hover'>Delete</button>
            </div>
        </div>

    </div>
    )
}


export default MyBlog;