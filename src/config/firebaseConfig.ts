// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// hemn ddfof
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tech-hiem.firebaseapp.com",
  projectId: "tech-hiem",
  storageBucket: "tech-hiem.appspot.com",
  messagingSenderId: "871814162415",
  appId: "1:871814162415:web:4a69155039eedaab03381a",
  measurementId: "G-H4Z04PFCCJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
