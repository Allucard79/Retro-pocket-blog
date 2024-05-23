import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArrCTmByEir3__vrWvOgzujXasJSlXNwA",
  authDomain: "retro-pocket-blog.firebaseapp.com",
  projectId: "retro-pocket-blog",
  storageBucket: "retro-pocket-blog.appspot.com",
  messagingSenderId: "33530576283",
  appId: "1:33530576283:web:44ebae70a42395dbe3353e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { fireDB, auth, storage };
