import { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Context from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import {ApiKey} from '../../helpers/Helpers'

export default function AddPost() {
  const [posts, setPosts] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [text, setText] = useState("");
  const [thumbnail, setThumbnail] = useState();

  const context = useContext(Context);
  const { mode } = context;

  const navigate = useNavigate();

  //* Add Post Function
  const addBlogPost = async () => {
    if (
      posts.title === "" ||
      posts.category === "" ||
      posts.content === "" ||
      posts.thumbnail === ""
    ) {
      toast.error("Please Fill All Fields");
    }
    uploadImage();
  };

  //* Upload Image Function
  const uploadImage = () => {
    if (!thumbnail) return;
    const imageRef = ref(storage, `postimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        const productRef = collection(fireDB, "blogPost");
        try {
          addDoc(productRef, {
            posts,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          });
          navigate("/admindashboard");
          toast.success("Post Added Successfully");
        } catch (error) {
          toast.error(error);
          console.log(error);
        }
      });
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <div className=" container mx-auto max-w-5xl py-6">
      <div
        className="p-5"
        style={{
          background: mode === "dark" ? "#353b48" : "rgb(226, 232, 240)",
          borderBottom:
            mode === "dark"
              ? " 4px solid rgb(226, 232, 240)"
              : " 4px solid rgb(30, 41, 59)",
        }}
      >
        {/* Top Item  */}
        <div className="mb-2 flex justify-between">
          <div className="flex gap-2 items-center">
            {/* Text  */}
            <Typography
              variant="h4"
              style={{
                color: mode === "dark" ? "white" : "black",
              }}
            >
              Create Post
            </Typography>
            {/* Dashboard Link  */}
          </div>
          <Link
            to={"/admindashboard"}
            className="flex gap-2 mt-2 font-semibold"
            style={{
              color: mode === "dark" ? "white" : "black",
            }}
          >
            <BsFillArrowLeftCircleFill size={25} /> Dashboard
          </Link>
        </div>
        {/* main Content  */}
        <div className="mb-3">
          {/* Thumbnail  */}
          {thumbnail && (
            <img
              className=" w-full rounded-md mb-3 "
              src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
              alt="thumbnail"
            />
          )}
          {/* Text  */}
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-semibold"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Upload Picture
          </Typography>
          {/* First Thumbnail Input  */}
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
        {/* Third Category Input  */}
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
        {/* Four Editor  */}
        <Editor
          apiKey={ApiKey}
          onEditorChange={(newValue, editor) => {
            setPosts({ ...posts, content: newValue });
            setText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          init={{
            plugins: "image link",
            toolbar:
              "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image | print preview media fullscreen | " +
              "forecolor backcolor emoticons | help",
          }}
        />
        {/* Five Submit Button  */}
        <Button
          className=" w-full mt-5"
          onClick={addBlogPost}
          style={{
            background:
              mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
            color: mode === "dark" ? "rgb(30, 41, 59)" : "rgb(226, 232, 240)",
          }}
        >
          Add Post
        </Button>
        {/* Six Preview Section  */}
        <div className="">
          <h1
            className=" text-center mb-3 text-2xl"
            style={{
              color: mode === "dark" ? "white" : "black",
            }}
          >
            Preview
          </h1>
          <div className="content">
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
              dangerouslySetInnerHTML={createMarkup(posts.content)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
