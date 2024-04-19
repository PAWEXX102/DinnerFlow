// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Attention Please add your firebase console config here
const firebaseConfig = {
  apiKey: "AIzaSyDtjL2poI_7rPYiwoOY8kwE34ZzM6fCM9Y",
  authDomain: "dinner-3.firebaseapp.com",
  projectId: "dinner-3",
  storageBucket: "dinner-3.appspot.com",
  messagingSenderId: "933693689176",
  appId: "1:933693689176:web:10e8bc0b91277045f2292d",
  measurementId: "G-097ZWG8K54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
