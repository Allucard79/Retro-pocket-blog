import { useContext } from "react";
import Context from "../../context/Context";
import MainContent from "../../components/mainContent/MainContent";
import Picture from "../../assets/img/logo.png";

export default function AllPosts() {
  const context = useContext(Context);
  const { mode } = context;

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
            {/* Post 1  */}
            <div className="p-4 md:w-1/3">
              <div
                style={{
                  background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
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
                <img className=" w-full" src={Picture} alt="blog" />

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
                    {"21 May 2024"}
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
                    {"Retro emulation"}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>

            {/* Post 2  */}
            <div className="p-4 md:w-1/3">
              <div
                style={{
                  background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                  borderBottom:
                    mode === "dark"
                      ? " 4px solid rgb(226, 232, 240)"
                      : " 4px solid rgb(30, 41, 59)",
                }}
                className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
              >
                {/* Post Thumbnail  */}
                <img className=" w-full" src={Picture} alt="blog" />

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
                    {"21 May 2024"}
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
                    {"Retro games"}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>

            {/* Post 3 */}
            <div className="p-4 md:w-1/3">
              <div
                style={{
                  background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                  borderBottom:
                    mode === "dark"
                      ? " 4px solid rgb(226, 232, 240)"
                      : " 4px solid rgb(30, 41, 59)",
                }}
                className={`h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
               rounded-xl overflow-hidden`}
              >
                {/* Post Thumbnail  */}
                <img className=" w-full" src={Picture} alt="blog" />

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
                    {"21 May 2024"}
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
                    {"Retro console"}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainContent>
  );
}
