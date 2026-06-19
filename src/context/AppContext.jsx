import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { updateToolUsage, fetchAISuggestions } from "../api";
import { getUserUsage } from "../utils/toolUsage";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

  // ================= FIREBASE ONLY AUTH =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "User",
          source: "firebase",
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ================= LOGIN (BACKEND) =================
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      if (res.data?.success) {
        const u = res.data.user;

        setUser({
          ...u,
          source: "backend",
        });

        setPlan(u.plan || "free");
        localStorage.setItem("toolgrid_token", res.data.token);

        resetGuestUsage();

        return { success: true };
      }

      return { success: false, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ================= SIGNUP =================
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data?.success) {
        resetGuestUsage();
        return { success: true };
      }

      return { success: false, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  // ================= LOGOUT =================
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setPlan("free");
      localStorage.removeItem("toolgrid_token");
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

  // ================= TOOL ACCESS (FIXED CORE) =================
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

  // ================= CONTEXT =================
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
      {loading ? <div>Loading...</div> : children}
    </AppContext.Provider>
  );
};