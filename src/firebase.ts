import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const api_key = import.meta.env.VITE_API_KEY;
console.log(api_key);
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "gym-note-90498.firebaseapp.com",
  projectId: "gym-note-90498",
  storageBucket: "gym-note-90498.firebasestorage.app",
  messagingSenderId: "8804564109",
  appId: "1:8804564109:web:60335609bc916291f7f6c4",
  measurementId: "G-03Y3GVY2WR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { auth, db, storage };
