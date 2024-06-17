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
  const { mode, language, setLoading, loading } = context;

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "blogPost"));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedPosts = postsData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setPosts(sortedPosts);
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
          {posts.length > 0 ? (
            posts.map(post => {
              return (
<>
                <Post key={post.id} post={post} />
                <div
                  className={`border-b mb-5 overflow-hidden max-w-4xl mx-auto px-4 ${
                    mode === "dark" ? "border-gray-600" : "border-gray-400"
                  }`}
                />
              </>
              )
              
            })
          ) : (
            <h1 className="flex justify-center my-5 text-xl font-bold">
              {language === "pl"
                ? "Nie ma żadnych postów do wyświetlenia"
                : "No posts to display"}
            </h1>
          )}
        </div>
      )}
      {/* See More Button  */}
      <div className="flex justify-center my-5">
        <Link to={"/allposts"}>
          <Button
            className={`h-full cursor-pointer
              ${
                mode === "dark"
                  ? "bg-gray-800 hover:bg-gray-600"
                  : "bg-orange-900 hover:bg-indigo-800"
              } 
              rounded-xl overflow-hidden`}
          >
            {language === "pl" ? "Więcej" : "See More"}
          </Button>
        </Link>
      </div>
    </MainContent>
  );
}
