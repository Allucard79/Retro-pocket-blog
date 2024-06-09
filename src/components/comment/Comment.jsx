import { useContext, useState } from "react";
import { Button, Collapse } from "@material-tailwind/react";
import Context from "../../context/Context";

export default function Comment({
  addComment,
  commentText,
  setCommentText,
  allComment,
  fullName,
  setFullName,
}) {
  const context = useContext(Context);
  const { mode } = context;

  const [openNav, setOpenNav] = useState(false);

  return (
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <Collapse open={openNav}>
          <form className="mb-6">
            {/* Full Name Input  */}
            <div
              className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
            shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            >
              <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
                style={{
                  background:
                    mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
                }}
              />
            </div>
            {/* Text Area  */}
            <div
              className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
              style={{
                background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
              }}
            >
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 "
                style={{
                  background:
                    mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
                }}
                placeholder="Write a comment..."
                required
                defaultValue={""}
              />
            </div>
            {/* Button  */}
            <div className="">
              <Button
                onClick={addComment}
                style={{
                  background:
                    mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                  color:
                    mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
                }}
              >
                Add comment
              </Button>
            </div>
          </form>
        </Collapse>
        {/* Comment Form  */}
        <div className="flex items-center justify-between p-1 text-xl">
          <h3
            className="flex items-center justify-between p-1 text-xl font-semibold text-gray-700"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            All comments
          </h3>
          <button
            onClick={() => setOpenNav(!openNav)}
            className="flex items-center justify-between p-1 text-lg font-semibold text-gray-700 rounded-lg focus:outline-none"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            <span>Post comment</span>
            <svg
              className={`w-6 h-6 transition-transform transform ${
                openNav ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Bottom Item  */}
        <article
          className="p-6 mb-6 text-base rounded-lg "
          style={{
            background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          }}
        >
          {allComment.length > 0 ? (
            allComment.map((item, index) => {
              const { fullName, date, commentText } = item;
              return (
                <div key={index}>
                  <footer className="flex justify-between items-center mb-">
                    <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">
                      <p
                        className="inline-flex items-center mr-3 text-lg  "
                        style={{ color: mode === "dark" ? "black" : "black" }}
                      >
                        {fullName}
                      </p>
                      <p
                        className="text-sm "
                        style={{ color: mode === "dark" ? "black" : "black" }}
                      >
                        {date}
                      </p>
                    </div>
                  </footer>
                  <p
                    className="text-gray-500 dark:text-gray-400 text-md"
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    ↳ {commentText}
                  </p>
                </div>
              );
            })
          ) : (
            <p
              className="text-gray-500 dark:text-gray-400 text-md"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              There is no comments
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
