import { useContext, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MainContent from "../../components/mainContent/MainContent";
import Context from "../../context/Context";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import Loader from "../../components/loader/Loader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const context = useContext(Context);
  const { mode, setLoading, loading } = context;

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "blogPost"));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  return (
    <MainContent>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
      {/* See More Button  */}
      <div className="flex justify-center my-5">
        <Link to={"/allposts"}>
          <Button
            style={{
              background: mode === "dark" ? "rgb(226, 232, 240)" : "#30336B",
              color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
            }}
          >
            See More
          </Button>
        </Link>
      </div>
    </MainContent>
  );
}
