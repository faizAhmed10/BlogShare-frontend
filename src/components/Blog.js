import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tuw from "../utils/assets/thumbs-up-white.png";
import tdw from "../utils/assets/thumbs-down-white.png";
import tub from "../utils/assets/thumbs-up-black.png";
import tdb from "../utils/assets/thumbs-down-black.png";
import AuthContext from "../utils/AuthContext";

const Blog = ({
  blog,
  upvote,
  downvote,
  postreply,
  getMyReplies,
  deletereply,
}) => {
  const [replies, setReplies] = useState([]);
  const [myreplies, setMyReplies] = useState([]);
  const [displayedReplies, setDisplayedReplies] = useState([]);
  const [reply, setReply] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  let { getReplies } = useContext(AuthContext);

  useEffect(() => {
    const fetchReplies = async () => {
      const data = await getReplies(blog.id);
      const data2 = await getMyReplies(blog.id);

      if (data2.length !== 0) {
        setMyReplies(data2);
        const combinedReplies = [
          ...data2,
          ...data.filter((reply) => !data2.some((r) => r.id === reply.id)),
        ];

        setReplies(combinedReplies);
        setDisplayedReplies(combinedReplies.slice(0, 3));
      } else {
        setReplies(data);
        setDisplayedReplies(data.slice(0, 3));
      }
    };

    fetchReplies();
  }, [blog.id]);

  const loadMoreReplies = () => {
    setLoading(true);
    const newPage = page + 1;
    const newReplies = replies.slice(0, newPage * 10 + 3);
    setDisplayedReplies(newReplies);
    setPage(newPage);
    setLoading(false);
  };

  return (
    <div>
      <div className="bdr p-3 my-4 lg:w-3/4 w-[95%] mx-auto overflow-hidden rounded bg-[#343366]">
        <Link to={`/feed/blog/${blog.id}`}>
          <div className="flex items-center my-2">
            <img
              className="max-w-[50px] min-h-[50px] mx-2 rounded-full"
              src={blog.user.profile.profile_picture}
              alt={blog.user.username}
            />
            <p className="text-xl">{blog.user.username}</p>
          </div>
          <h1 className="lg:text-5xl text-2xl my-3">{blog.title}</h1>
          <h2 className="lg:text-3xl text-xl my-2 font-[kalam]">{blog.sub_title}</h2>
          <div className="my-1" dangerouslySetInnerHTML={{ __html: blog.body.substring(0, 100) + '...' }}></div>
          {blog.image && <img
            src={blog.image}
            className="rounded my-2 min-w-full max-h-[500px]"
            alt="Blog"
          />}
        </Link>
        <div className="flex">
          <div className="flex flex-col items-center">
            <img
              src={blog.userVote === "upvote" ? tub : tuw}
              onClick={() => upvote(blog)}
              alt="Upvote"
            />
            <p>{blog.upvotes}</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={blog.userVote === "downvote" ? tdb : tdw}
              onClick={() => downvote(blog)}
              alt="Downvote"
            />
            <p>{blog.downvotes}</p>
          </div>
        </div>
        <div className="my-6 ">
          {displayedReplies && displayedReplies.length > 0 ? (
            displayedReplies.map((reply, index) => (
              <div key={index}>
                <p>
                  <span className="">
                    {reply.user ? reply.user.username : "username"}
                  </span>
                  :{" "}
                  {myreplies.some((r) => r.user === reply.user) ? (
                    <span>
                      {reply.reply}{" "}
                      <button
                        className="bg-[#00C897] px-3 rounded py-1 btn-hover"
                        onClick={() => deletereply(reply.id)}
                      >
                        Delete
                      </button>
                    </span>
                  ) : (
                    reply.reply
                  )}
                </p>
              </div>
            ))
          ) : (
            <p>No replies yet</p>
          )}

          {displayedReplies.length < replies.length && (
            <button
              className="bg-[#00C897] px-3 rounded py-1 my-2 btn-hover"
              onClick={loadMoreReplies}
              disabled={loading}
            >
              {loading ? "Loading..." : "Read More"}
            </button>
          )}

          <div className="my-2">
            <input
              placeholder="post a reply..."
              type="text"
              onChange={(e) => setReply(e.target.value)}
              className="py-1 px-1.5 rounded bg-[#030637]"
            />
            <button
              className="bg-[#00C897] px-3 rounded py-1 btn-hover"
              onClick={() => postreply(blog.id, reply)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
