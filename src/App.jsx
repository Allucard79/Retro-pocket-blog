import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import State from "./context/State";
import Home from "./pages/home/Home";
import PostCard from "./components/post/PostCard";
import AllPosts from "./pages/allPosts/AllPosts";
import Post from "./components/post/Post";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddPost from "./pages/admin/AddPost";
import EditPost from "./pages/admin/EditPost";
import NoPage from "./pages/nopage/Nopage";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForAdmin } from "./helpers/ProtectedRouteForAdmin";

function App() {
  return (
    <State>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostCard />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="/post/:id" element={<Post />} />
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
          <Route
            path="/editpost/:id"
            element={
              <ProtectedRouteForAdmin>
                <EditPost />
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
