import { useEffect, useState } from "react";
import Context from "./Context";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

export default function State(props) {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "pl"
  );
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [getAllPosts, setGetAllPosts] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor =
      mode === "light" ? "white" : "rgb(17, 24, 39)";
  }, [mode]);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    document.body.style.backgroundColor =
      newMode === "light" ? "white" : "rgb(17, 24, 39)";
  };

  const toggleLanguage = () => {
    const newLanguage = language === "pl" ? "en" : "pl";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  //* getAllPosts Function
  function getAllBlogPosts() {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, QuerySnapshot => {
        let postArray = [];
        QuerySnapshot.forEach(doc => {
          postArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllPosts(postArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllBlogPosts();
  }, []);

  // Post Delete Function
  const deletePost = async id => {
    try {
      await deleteDoc(doc(fireDB, "blogPost", id));
      getAllBlogPosts();
      toast.success("Post deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        mode,
        toggleMode,
        language,
        toggleLanguage,
        searchKey,
        setSearchKey,
        loading,
        setLoading,
        getAllPosts,
        deletePost,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
