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
  apiKey: "AIzaSyBkwyqsGQbelJIUVXV_ShGI3mmeON8sSKs",
  authDomain: "dinner-fe10a.firebaseapp.com",
  projectId: "dinner-fe10a",
  storageBucket: "dinner-fe10a.appspot.com",
  messagingSenderId: "43190291141",
  appId: "1:43190291141:web:49ccecd42bf056bd317eac",
  measurementId: "G-XYYDD0H2N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
