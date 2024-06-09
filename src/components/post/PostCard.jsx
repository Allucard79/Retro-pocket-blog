import { useContext } from "react";
import Context from "../../context/Context";
import { useNavigate } from "react-router-dom";

export default function PostCard() {
  const context = useContext(Context);
  const { mode, getAllPosts } = context;

  const navigate = useNavigate();

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Post card  */}
            {getAllPosts.length > 0 ? (
              <>
                {getAllPosts.map((item, index) => {
                  const { thumbnail, id, date } = item;
                  return (
                    <div
                      className="p-4 md:w-1/3"
                      key={index}
                      onClick={() => navigate(`/post/${id}`)}
                    >
                      <div
                        style={{
                          background: mode === "dark" ? "#1E293B" : "#683058",
                          border:
                            mode === "dark"
                              ? " 4px solid #BEBDCC"
                              : " 4px solid #683058",
                        }}
                        className={`h-full shadow-xl cursor-pointer
             ${
               mode === "dark"
                 ? "hover:shadow-gray-400"
                 : "hover:shadow-indigo-900"
             } 
             rounded-xl overflow-hidden`}
                      >
                        {/* Post Thumbnail  */}
                        <img className=" w-full" src={thumbnail} alt="post" />

                        {/* Top Items  */}
                        <div className="p-6">
                          {/* Post Date  */}
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : " rgb(226, 232, 240)",
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
                                  : " rgb(226, 232, 240)",
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
                {" "}
                <h1 className="text-xl font-bold">No posts to display</h1>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
