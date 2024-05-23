import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import State from "./context/State";
import Home from "./pages/home/Home";
import Post from "./components/post/Post";
import AllPosts from "./pages/allPosts/AllPosts";
import PostInfo from "./pages/allPosts/postInfo/PostInfo";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddPost from "./pages/admin/AddPost";
import NoPage from "./pages/nopage/Nopage";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./helpers/ProtectedRouteForAdmin";

function App() {
  return (
    <State>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/postinfo/:id" element={<PostInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admindashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addpost"
            element={
              <ProtectedRouteForAdmin>
                <AddPost />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster />
      </Router>
    </State>
  );
}

export default App;
