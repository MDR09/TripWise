// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuc2F-j0rOH2Gx6S3C_lRu9HHei2ma8N4",
  authDomain: "ai-trip-planner-1f93e.firebaseapp.com",
  projectId: "ai-trip-planner-1f93e",
  storageBucket: "ai-trip-planner-1f93e.firebasestorage.app",
  messagingSenderId: "767351676544",
  appId: "1:767351676544:web:1bd0ba8fbdaaa79355d065",
  measurementId: "G-RDP96VQDD7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);