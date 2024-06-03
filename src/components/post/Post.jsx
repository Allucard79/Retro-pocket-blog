import { useContext, useEffect, useState } from "react";
import Context from "../../context/Context";
import { useParams } from "react-router";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import MainContent from "../mainContent/MainContent";
import Loader from "../loader/Loader";
import Comment from "../comment/Comment";
import toast from "react-hot-toast";

export default function Post() {
  const [getPosts, setGetPosts] = useState();
  const context = useContext(Context);
  const { mode, setLoading, loading } = context;

  const params = useParams();

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "blogPost", params.id));
      if (productTemp.exists()) {
        setGetPosts(productTemp.data());
      } else {
        console.log("Document does not exist");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
    window.scrollTo(0, 0);
  }, []);

  //* Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const commentRef = collection(
      fireDB,
      "blogPost/" + `${params.id}/` + "comment"
    );
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comment Add Successfully");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allComment, setAllComment] = useState([]);

  const getComment = async () => {
    try {
      const q = query(
        collection(fireDB, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy("time")
      );
      const data = onSnapshot(q, QuerySnapshot => {
        let commentsArray = [];
        QuerySnapshot.forEach(doc => {
          commentsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(commentsArray);
        console.log(commentsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComment();
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainContent>
      <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
        <div className=" py-4 lg:py-8">
          {loading ? (
            <Loader />
          ) : (
            <div>
              {/* Thumbnail  */}
              <img
                alt="content"
                className="mb-3 rounded-lg h-full w-full"
                src={getPosts?.thumbnail}
              />
              {/* title And date  */}
              <div className="flex justify-between items-center mb-3">
                <h1
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  className=" text-xl md:text-2xl lg:text-2xl font-semibold"
                >
                  {getPosts?.posts?.title}
                </h1>
                <p style={{ color: mode === "dark" ? "white" : "black" }}>
                  {getPosts?.date}
                </p>
              </div>
              <div
                className={`border-b mb-5 ${
                  mode === "dark" ? "border-gray-600" : "border-gray-400"
                }`}
              />
              {/* post Content  */}
              <div className="content">
                <div
                  className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#ff4d4d]"
                            : "[&>h1]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h2]:text-white"
                            : "[&>h2]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h3]:text-white"
                            : "[&>h3]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h4]:text-white"
                            : "[&>h4]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h5]:text-white"
                            : "[&>h5]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>h6]:text-white"
                            : "[&>h6]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>p]:text-[#7efff5]"
                            : "[&>p]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ul]:text-white"
                            : "[&>ul]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        ${
                          mode === "dark"
                            ? "[&>ol]:text-white"
                            : "[&>ol]:text-black"
                        }
                        `}
                  dangerouslySetInnerHTML={createMarkup(
                    getPosts?.posts?.content
                  )}
                ></div>
              </div>
            </div>
          )}
          <Comment
            addComment={addComment}
            commentText={commentText}
            setCommentText={setCommentText}
            allComment={allComment}
            fullName={fullName}
            setFullName={setFullName}
          />
        </div>
      </section>
    </MainContent>
  );
}
