// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // auth ইমপোর্ট করো

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoqZRwrmMnpQAESQKhwJX4bG-ZyEua-ik",
  authDomain: "tool-grid-19d3c.firebaseapp.com",
  projectId: "tool-grid-19d3c",
  storageBucket: "tool-grid-19d3c.firebasestorage.app",
  messagingSenderId: "54569459916",
  appId: "1:54569459916:web:af3c24f2712f7ad31d2269",
  measurementId: "G-1LK556TZV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);