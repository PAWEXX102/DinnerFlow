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
  apiKey: "AIzaSyAIvB-70vG35h6T90LitDjQsylCb4-AUog",
  authDomain: "dinnerflow-2f364.firebaseapp.com",
  databaseURL:
    "https://dinnerflow-2f364-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "dinnerflow-2f364",
  storageBucket: "dinnerflow-2f364.appspot.com",
  messagingSenderId: "846994873159",
  appId: "1:846994873159:web:c4b260fcfc7aefa7d18a62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
