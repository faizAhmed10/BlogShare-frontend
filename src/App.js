import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import Navbar from "./components/Navbar";
import FeedPage from "./pages/FeedPage";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogPage from "./pages/BlogPage";
import { useContext } from "react";
import AuthContext from "./utils/AuthContext";
import MyBlogs from "./pages/MyBlogs";
import MyProfile from "./pages/MyProfile";
import UpdateBlogPage from "./pages/UpdateBlogPage";
import MobileNavbar from "./components/MobileNavbar";
import MobileHeader from "./components/MobileHeader";
function App() {
  let { user } = useContext(AuthContext);

  const checkUser = (element) => {
    if (user) {
      return element;
    }
    return <Login />;
  };

  return (
    <div>{
      window.innerWidth >= 768 ? <Navbar/> : <MobileNavbar/>
      }
      {window.innerWidth >= 768 ? null : <MobileHeader/> }
      
      <div className="mt-[5rem] mb-[5rem] lg:mb-0">
      <Routes>
        <Route exact path="/" element={<StartPage />} />
        <Route path="/feed" element={checkUser(<FeedPage />)} />
        <Route path="/feed/blog/:id" element={checkUser(<BlogPage />)} />
        <Route path="/create-blog" element={checkUser(<CreateBlog />)} />
        <Route path="/my-blogs/:username" element={checkUser(<MyBlogs />)} />
        <Route path="/:username" element={checkUser(<MyProfile />)} />
        <Route
          path="/update-blog/:id"
          element={checkUser(<UpdateBlogPage />)}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
