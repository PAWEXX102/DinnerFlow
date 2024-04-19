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
  apiKey: "AIzaSyDOnGQYuJZBDqp14jRalwqtHnDzTIi-F3w",
  authDomain: "dinner-flow-2.firebaseapp.com",
  projectId: "dinner-flow-2",
  storageBucket: "dinner-flow-2.appspot.com",
  messagingSenderId: "173343481183",
  appId: "1:173343481183:web:0f57e15b8262016d81eaea",
  measurementId: "G-JLM8B8Z7PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
