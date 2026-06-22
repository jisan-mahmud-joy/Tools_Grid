import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { updateToolUsage, fetchAISuggestions } from "../api";
import { getUserUsage } from "../utils/toolUsage";
import { auth } from "../firebase";
import { 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  updateProfile 
} from "firebase/auth";

export const AppContext = createContext();

const API_BASE = "http://localhost:5000/api";

export const AppProvider = ({ children }) => {
  // ================= STATES =================
  const [view, setView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("night");
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [plan, setPlan] = useState("free");

  const [guestUsageCount, setGuestUsageCount] = useState(() => {
    return Number(localStorage.getItem("guestUsageCount")) || 0;
  });

  // ================= FIREBASE AUTH OBSERVER =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // জিমেইল ভেরিফাইড হলেই কেবল অ্যাপে এক্সেস দেওয়া হবে
        if (firebaseUser.emailVerified) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "User",
            source: "firebase",
          });
          
          // ব্যাকএন্ডে সেশন সিঙ্ক বা টোকেন জেনারেট করার জন্য কল (ঐচ্ছিক)
          try {
            const res = await axios.post(`${API_BASE}/auth/sync-user`, {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName
            });
            if (res.data?.token) {
              localStorage.setItem("toolgrid_token", res.data.token);
            }
          } catch (err) {
            console.error("Backend sync failed", err);
          }
        } else {
          // ইমেইল ভেরিফাইড না হলে স্টেট ক্লিন রাখা হবে
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ================= LOGIN WITH VERIFICATION CHECK =================
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const u = userCredential.user;

      // যদি জিমেইল ভেরিফাই না করে থাকে
      if (!u.emailVerified) {
        await signOut(auth); // তাকে সেশন থেকে বের করে দেওয়া হবে
        return { 
          success: false, 
          message: "Please verify your email address. Check your inbox or spam folder!" 
        };
      }

      setUser({
        uid: u.uid,
        email: u.email || "",
        name: u.displayName || "User",
        source: "firebase",
      });

      resetGuestUsage();
      return { success: true };
    } catch (err) {
      let msg = "Login failed";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many attempts. Try again later.";
      }
      return { success: false, message: msg };
    }
  };

  // ================= SIGNUP WITH VERIFICATION LINK =================
  const signup = async (name, email, password) => {
    try {
      // ১. ফায়ারবেসে ইউজার তৈরি
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // ২. প্রোফাইলে নাম সেট করা
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // ৩. আসল জিমেইলে ভেরিফিকেশন লিংক পাঠানো
      await sendEmailVerification(userCredential.user);

      // অ্যাকাউন্ট খোলার সাথে সাথে ফায়ারবেস লগইন করায়, কিন্তু লিংক ভেরিফাই না করা পর্যন্ত লগআউট করিয়ে রাখা হবে
      await signOut(auth);

      resetGuestUsage();
      return { success: true, message: "Verification link sent! Please check your Gmail." };
    } catch (err) {
      let msg = "Signup failed";
      if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered!";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }
      return { success: false, message: msg };
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setPlan("free");
      localStorage.removeItem("toolgrid_token");
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= GUEST USAGE =================
  const incrementGuestUsage = () => {
    setGuestUsageCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("guestUsageCount", String(newCount));
      return newCount;
    });
  };

  const resetGuestUsage = () => {
    setGuestUsageCount(0);
    localStorage.removeItem("guestUsageCount");
  };

  // ================= TOOL ACCESS =================
  const canUseTool = useMemo(() => {
    const isLoggedIn = Boolean(user?.uid || user?.email);
    return isLoggedIn || guestUsageCount < 3;
  }, [user, guestUsageCount]);

  // ================= TOOL USAGE =================
  const useTool = async (toolId) => {
    if (!user?.email) return null;
    try {
      return await updateToolUsage(user.email, toolId);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const checkToolLimit = (toolId) => {
    if (!user?.email) return guestUsageCount < 3;
    const usage = getUserUsage(user.email);
    const count = usage?.[toolId] || 0;
    const limit = plan === "pro" ? Infinity : 10;
    return count < limit;
  };

  // ================= AI =================
  const loadAISuggestions = async () => {
    if (!user?.email) return;
    try {
      const res = await fetchAISuggestions(user.email);
      setAISuggestions(res || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= CONTEXT VALUE =================
  const value = {
    view,
    setView,
    sidebarOpen,
    setSidebarOpen,
    theme,
    setTheme,
    user,
    setUser,
    plan,
    setPlan,
    loading,
    login,
    signup,
    logout,
    useTool,
    checkToolLimit,
    guestUsageCount,
    incrementGuestUsage,
    resetGuestUsage,
    canUseTool,
    aiSuggestions,
    loadAISuggestions,
  };

  return (
    <AppContext.Provider value={value}>
      {loading ? <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Workspace...</div> : children}
    </AppContext.Provider>
  );
};