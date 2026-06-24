import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ← এটা add করুন

const firebaseConfig = {
  apiKey: "AIzaSyBoqZRwrmMnpQAESQKhwJX4bG-ZyEua-ik",
  authDomain: "tool-grid-19d3c.firebaseapp.com",
  projectId: "tool-grid-19d3c",
  storageBucket: "tool-grid-19d3c.firebasestorage.app",
  messagingSenderId: "54569459916",
  appId: "1:54569459916:web:af3c24f2712f7ad31d2269",
  measurementId: "G-1LK556TZV3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ← এটা add করুন
export default app;