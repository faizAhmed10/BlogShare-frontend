import React, { useEffect, useState, useRef, useCallback } from "react";
import Blog from "../components/Blog";
const FeedPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const getBlogs = async (page) => {
    try {
      let response = await fetch(`/api/blogs/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      setBlogs((prevBlogs) => {
        const newBlogs = data.results.filter(
          (newBlog) => !prevBlogs.some((blog) => blog.id === newBlog.id)
        );
        return [...prevBlogs, ...newBlogs];
      });
      setHasMore(data.next !== null);
    } catch (error) {
      console.log(error);
    }
  };

  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const token = JSON.parse(localStorage.getItem("authTokens")).access;

  const toggleUpVote = async (blog) => {
    try {
      let response = await fetch(`/api/blogs/${blog.id}/upvote/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id
            ? {
                ...b,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                userVote: "upvote",
              }
            : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDownVote = async (blog) => {
    try {
      let response = await fetch(`/api/blogs/${blog.id}/downvote/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id
            ? {
                ...b,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                userVote: "downvote",
              }
            : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const lastBlogElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );
  
  const postReply = async (blog_id, reply) => {
    try{
      const response = await fetch(`/api/blogs/postreply/${blog_id}/`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          reply: reply
        })
      })

      let data = await response.json()
      console.log(data)
      window.location.reload()
    } catch(error){
      console.log(error)
    }
  }

  const getMyReplies = async (blog_id) => {
    try{
      const response = await fetch(`/api/blogs/getmyreplies/${blog_id}/`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
  
      let data = await response.json()
      return data
    }catch(error){
      console.log(error)
    }
    
  }

  const deleteReply = async (reply_id) => {
    try{
      const response = await fetch(`/api/blogs/deletereply/${reply_id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      let data = await response.json()
      console.log(data)
      window.location.reload()
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogs(page);
  }, [page]);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div ref={blogs.length === index + 1 ? lastBlogElementRef : null} key={index}>
            <Blog              
              blog={blog}
              upvote={toggleUpVote}
              downvote={toggleDownVote}
              postreply={postReply}
              getMyReplies={getMyReplies}
              deletereply={deleteReply}
            />
          </div>
        ))
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default FeedPage;
