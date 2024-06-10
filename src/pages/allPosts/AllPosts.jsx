import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import MainContent from "../../components/mainContent/MainContent";
import PostCard from "../../components/post/PostCard";

export default function AllPosts() {
  const context = useContext(Context);
  const { mode, language } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainContent>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Top Heading  */}
          <div className="mb-5">
            <h1
              className=" text-center text-2xl font-bold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
               {language === "pl" ? "Wszystkie artykuły" : " All Posts"}
             
            </h1>
          </div>
          {/* Main Content  */}
          <PostCard/>
        </div>
      </section>
    </MainContent>
  );
}
