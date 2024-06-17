import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useLocation } from "react-router-dom";
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
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Context from "../../context/Context";
import Loader from "../loader/Loader";
import Comment from "../comment/Comment";
import toast from "react-hot-toast";
import TopButton from "../topButton/TopButton";

export default function Post({ post }) {
  const [getPost, setGetPost] = useState(post || {});
  const context = useContext(Context);
  const { mode, setLoading, loading, language } = context;
  const params = useParams();
  const postId = params.id || post?.id;

  const location = useLocation();
  const urlContainsPost = location.pathname.includes("post");

  const fetchPost = async () => {
    if (post) return; // Skip fetching if post data is provided via props

    setLoading(true);
    try {
      const postDoc = await getDoc(doc(fireDB, "blogPost", postId));
      if (postDoc.exists()) {
        setGetPost(postDoc.data());
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
    fetchPost();
    window.scrollTo(0, 0);
  }, [postId]);

  function createMarkup(content) {
    return { __html: content };
  }

  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const commentRef = collection(fireDB, `blogPost/${postId}/comment`);
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
      toast.success("Comment added successfully");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const [allComments, setAllComments] = useState([]);

  const fetchComments = async () => {
    try {
      const q = query(
        collection(fireDB, `blogPost/${postId}/comment`),
        orderBy("time")
      );
      const unsubscribe = onSnapshot(q, querySnapshot => {
        const commentsArray = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllComments(commentsArray);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
    window.scrollTo(0, 0);
  }, [postId]);

  return (
    <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4">
      <div className="py-4 lg:py-8">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <img
              alt="content"
              className="mb-3 rounded-lg h-full w-full"
              src={getPost?.thumbnail}
            />
            <div className="flex justify-between items-center mb-3">
              <h1
                style={{ color: mode === "dark" ? "white" : "black" }}
                className="text-xl md:text-2xl lg:text-2xl font-semibold"
              >
                {getPost?.posts?.title}
              </h1>
              <p style={{ color: mode === "dark" ? "white" : "black" }}>
                {getPost?.date}
              </p>
            </div>
            <div
              className={`border-b mb-5 ${
                mode === "dark" ? "border-gray-600" : "border-gray-400"
              }`}
            />
            <div className="content">
              {language === "pl" ? (
                <div
                  className={`[&>h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5 ${
                    mode === "dark"
                      ? "[&>h1]:text-[#E2E8F0]"
                      : "[&>h1]:text-black"
                  } ${
                    mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-black"
                  } ${
                    mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-black"
                  } ${
                    mode === "dark" ? "[&>h4]:text-white" : "[&>h4]:text-black"
                  } ${
                    mode === "dark" ? "[&>h5]:text-white" : "[&>h5]:text-black"
                  } ${
                    mode === "dark" ? "[&>h6]:text-white" : "[&>h6]:text-black"
                  } ${
                    mode === "dark"
                      ? "[&>p]:text-[#E2E8F0]"
                      : "[&>p]:text-black"
                  } ${
                    mode === "dark" ? "[&>ul]:text-white" : "[&>ul]:text-black"
                  } ${
                    mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"
                  }`}
                  dangerouslySetInnerHTML={createMarkup(
                    getPost?.posts?.contentPL
                  )}
                />
              ) : (
                <div
                  className={`[&>h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5 ${
                    mode === "dark"
                      ? "[&>h1]:text-[#E2E8F0]"
                      : "[&>h1]:text-black"
                  } ${
                    mode === "dark" ? "[&>h2]:text-white" : "[&>h2]:text-black"
                  } ${
                    mode === "dark" ? "[&>h3]:text-white" : "[&>h3]:text-black"
                  } ${
                    mode === "dark" ? "[&>h4]:text-white" : "[&>h4]:text-black"
                  } ${
                    mode === "dark" ? "[&>h5]:text-white" : "[&>h5]:text-black"
                  } ${
                    mode === "dark" ? "[&>h6]:text-white" : "[&>h6]:text-black"
                  } ${
                    mode === "dark"
                      ? "[&>p]:text-[#E2E8F0]"
                      : "[&>p]:text-black"
                  } ${
                    mode === "dark" ? "[&>ul]:text-white" : "[&>ul]:text-black"
                  } ${
                    mode === "dark" ? "[&>ol]:text-white" : "[&>ol]:text-black"
                  }`}
                  dangerouslySetInnerHTML={createMarkup(
                    getPost?.posts?.contentEN
                  )}
                />
              )}
            </div>
          </div>
        )}
        <Comment
          addComment={addComment}
          commentText={commentText}
          setCommentText={setCommentText}
          allComment={allComments}
          fullName={fullName}
          setFullName={setFullName}
        />
      </div>
      {urlContainsPost && (
        <Link
          to={"/"}
          className="flex gap-2 mb-5 font-semibold"
          style={{
            color: mode === "dark" ? "white" : "black",
          }}
        >
          <BsFillArrowLeftCircleFill size={25} />{" "}
          {language === "pl" ? "Powrót" : "Go back"}
        </Link>
      )}

      <TopButton />
    </section>
  );
}
