import { useEffect, useState } from "react";
import Context from "./Context";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

export default function State(props) {
  const [mode, setMode] = useState("light");
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [getAllPost, setGetAllPost] = useState([]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  //* getAllPosts Function
  function getAllPosts() {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, QuerySnapshot => {
        let postArray = [];
        QuerySnapshot.forEach(doc => {
          postArray.push({ ...doc.data(), id: doc.id });
        });

        setGetAllPost(postArray);
        console.log(postArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Context.Provider
      value={{
        mode,
        toggleMode,
        searchKey,
        setSearchKey,
        loading,
        setLoading,
        getAllPost,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
