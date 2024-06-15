import { useState, useContext, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Context from "../../context/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ApiKey } from "../../helpers/Helpers";

export default function UpdatePost() {
  const { id } = useParams(); // To get the post ID from the URL
  const [posts, setPosts] = useState({
    title: "",
    category: "",
    contentPL: "",
    contentEN: "",
  });
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const editorRef = useRef(null);

  const context = useContext(Context);
  const { mode, language, toggleLanguage } = context;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(fireDB, "blogPost", id);
      const postSnap = await getDoc(postDoc);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setPosts(postData.posts);
        setExistingThumbnail(postData.thumbnail);

        // Set content in the editor
        if (editorRef.current) {
          const content =
            language === "pl" ? postData.contentPL : postData.contentEN;
          editorRef.current.setContent(content);
        }
      } else {
        toast.error("Post not found");
        navigate("/admindashboard");
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id, language, navigate]); // Include language in dependencies if it can change

  //* Update Post Function
  const updateBlogPost = async () => {
    if (posts.title === "" || posts.category === "" || posts.content === "") {
      toast.error("Please Fill All Fields");
      return;
    }

    if (thumbnail) {
      uploadImage();
    } else {
      savePost(existingThumbnail);
    }
  };

  //* Upload Image Function
  const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `postimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        savePost(url);
      });
    });
  };

  const savePost = async imageUrl => {
    const postRef = doc(fireDB, "blogPost", id);
    try {
      await updateDoc(postRef, {
        posts,
        thumbnail: imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });
      navigate("/admindashboard");
      toast.success("Post Updated Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div className="container mx-auto max-w-5xl py-6">
      <div
        className="p-5"
        style={{
          background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          borderBottom:
            mode === "dark"
              ? "4px solid rgb(226, 232, 240)"
              : "4px solid rgb(30, 41, 59)",
        }}
      >
        {/* Top Item */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Text */}
            <Typography
              variant="h4"
              style={{
                color: mode === "dark" ? "white" : "black",
              }}
            >
              {language === "pl" ? "Edytuj post" : "Edit Post"}
            </Typography>
          </div>
          <div className="cursor-pointer text-sm flex items-center">
            {language === "pl" ? (
              <>
                {/* PL Language  */}
                <IconButton
                  onClick={toggleLanguage}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "20%",
                  }}
                >
                  PL
                </IconButton>
              </>
            ) : (
              <>
                {/* EN Language */}
                <IconButton
                  onClick={toggleLanguage}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "black",
                    padding: "10px",
                    borderRadius: "20%",
                  }}
                >
                  EN
                </IconButton>
              </>
            )}
          </div>
          <Link
            to={"/admindashboard"}
            className="flex gap-2 mt-2 font-semibold"
            style={{
              color: mode === "dark" ? "white" : "black",
            }}
          >
            <BsFillArrowLeftCircleFill size={25} />{" "}
            {language === "pl" ? "Anuluj" : "Cancel"}
          </Link>
        </div>
        {/* main Content */}
        <div className="mb-3">
          {/* Thumbnail */}
          {(thumbnail || existingThumbnail) && (
            <img
              className="w-full rounded-md mb-3"
              src={
                thumbnail ? URL.createObjectURL(thumbnail) : existingThumbnail
              }
              alt="thumbnail"
            />
          )}
          {/* Text */}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-semibold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            {language === "pl" ? "Zmień zdjęcie" : "Update Picture"}
          </Typography>
          {/* First Thumbnail Input */}
          <input
            type="file"
            label="Upload thumbnail"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            onChange={e => setThumbnail(e.target.files[0])}
          />
        </div>
        {/* Second Title Input */}
        <div className="mb-3">
          <input
            label="Enter your Title"
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
            placeholder="Enter Your Title"
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="title"
            onChange={e => setPosts({ ...posts, title: e.target.value })}
            value={posts.title}
          />
        </div>
        {/* Third Category Input */}
        <div className="mb-3">
          <select
            className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${
                   mode === "dark" ? "placeholder-black" : "placeholder-black"
                 }`}
            style={{
              background: mode === "dark" ? "#dcdde1" : "rgb(226, 232, 240)",
            }}
            name="category"
            onChange={e => setPosts({ ...posts, category: e.target.value })}
            value={posts.category}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Console">Console</option>
            <option value="Arcade">Arcade</option>
            <option value="Game">Game</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>
        {/* Four Editor */}
        <Editor
          apiKey={ApiKey}
          value={language === "pl" ? posts.contentPL : posts.contentEN}
          onEditorChange={newValue => {
            if (language === "pl") {
              setPosts({ ...posts, contentPL: newValue });
            } else {
              setPosts({ ...posts, contentEN: newValue });
            }
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          init={{
            plugins: "image link",
            toolbar:
              "undo redo | styles fontsize | bold italic | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image | " +
              "forecolor backcolor emoticons  | help",
            directionality: "ltr", // Ensure this is set to 'ltr'
          }}
        />
        {/* Five Submit Button */}
        <Button
          className="w-full mt-5"
          onClick={updateBlogPost}
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
          }}
        >
          {language === "pl" ? "Zapisz post" : "Update Post"}
        </Button>
        {/* Six Preview Section */}
        <div className="">
          <h1
            className="text-center mb-3 text-2xl"
            style={{
              color: mode === "dark" ? "white" : "black",
            }}
          >
            {language === "pl" ? "Podgląd" : "Preview"}
          </h1>
          <div className="content">
            {language === "pl" ? (
              <div
                className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#E2E8F0]"
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
                            ? "[&>p]:text-[#E2E8F0]"
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
                dangerouslySetInnerHTML={createMarkup(posts.contentPL)}
              ></div>
            ) : (
              <div
                className={`[&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${
                          mode === "dark"
                            ? "[&>h1]:text-[#E2E8F0]"
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
                            ? "[&>p]:text-[#E2E8F0]"
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
                dangerouslySetInnerHTML={createMarkup(posts.contentEN)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
