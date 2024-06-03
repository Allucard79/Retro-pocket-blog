import { useContext } from "react";
import Context from "../../context/Context";
import MainContent from "../../components/mainContent/MainContent";
import { useNavigate } from "react-router";

export default function AllPosts() {
  const context = useContext(Context);
  const { mode, getAllPost } = context;

  const navigate = useNavigate();

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
              All Posts
            </h1>
          </div>
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {getAllPost.length > 0 ? (
              <>
                {getAllPost.map((item, index) => {
                  const { thumbnail, id, date } = item;
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                          borderBottom:
                            mode === "dark"
                              ? " 4px solid rgb(226, 232, 240)"
                              : " 4px solid rgb(30, 41, 59)",
                        }}
                        className={`h-full shadow-lg cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
                      >
                        {/* Post Thumbnail  */}
                        <img
                          onClick={() => navigate(`/post/${id}`)}
                          className=" w-full"
                          src={thumbnail}
                          alt="blog"
                        />

                        {/* Top Items  */}
                        <div className="p-6">
                          {/* Post Date  */}
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {date}
                          </h2>

                          {/* Post Title  */}
                          <h1
                            className="title-font text-lg font-bold text-gray-900 mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {item.posts.title}
                          </h1>

                          {/* Post Description  */}
                          <p
                            className="leading-relaxed mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(30, 41, 59)",
                            }}
                          >
                            {item.posts.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">Not Found</h1>
              </>
            )}
          </div>
        </div>
      </section>
    </MainContent>
  );
}
