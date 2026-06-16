import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { updateToolUsage, fetchAISuggestions } from "../api";
import { getUserUsage } from "../utils/toolUsage";

export const AppContext = createContext();

const API_BASE_URL = "http://localhost:5000/api/auth";

export const AppProvider = ({ children }) => {
  const [view, setView] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("night");
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [plan, setPlan] = useState("free");

  // Guest Usage Counter
  const [guestUsageCount, setGuestUsageCount] = useState(
    Number(localStorage.getItem("guestUsageCount")) || 0
  );

  // Auto Login
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("toolgrid_token");

      if (token) {
        try {
          const res = await axios.get(`${API_BASE_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data?.success) {
            setUser(res.data.user);
            setPlan(res.data.user.plan || "free");
          } else {
            localStorage.removeItem("toolgrid_token");
          }
        } catch (err) {
          console.error("Auto-login failed:", err);
          localStorage.removeItem("toolgrid_token");
        }
      }

      setLoading(false);
    };

    checkLoggedInUser();
  }, []);

  // Login
  
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      if (res.data?.success) {
        setUser(res.data.user);
        setPlan(res.data.user.plan || "free");

        localStorage.setItem(
          "toolgrid_token",
          res.data.token
        );

        resetGuestUsage();

        return {
          success: true,
        };
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // Signup
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      if (res.data?.success) {
        resetGuestUsage();

        return {
          success: true,
        };
      }

      return {
        success: false,
        message: res.data.message,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Signup failed. Please try again.",
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setPlan("free");
    setView("dashboard");

    localStorage.removeItem("toolgrid_token");

    resetGuestUsage();
  };

  // Guest Usage
  const incrementGuestUsage = () => {
    const newCount = guestUsageCount + 1;

    setGuestUsageCount(newCount);

    localStorage.setItem(
      "guestUsageCount",
      newCount.toString()
    );
  };

  const resetGuestUsage = () => {
    setGuestUsageCount(0);

    localStorage.removeItem(
      "guestUsageCount"
    );
  };

  // Can Use Tool?
  const canUseTool =
    !!user || guestUsageCount < 3;

  // Tool Usage API
  const useTool = async (toolId) => {
    if (!user?.email) return null;

    try {
      const data = await updateToolUsage(
        user.email,
        toolId
      );

      return data;
    } catch (err) {
      console.error(
        "Tool usage update failed:",
        err
      );

      return null;
    }
  };

  // Tool Limit Check
  const checkToolLimit = (toolId) => {
    if (!user?.email) {
      return guestUsageCount < 3;
    }

    const usage = getUserUsage(
      user.email
    );

    const count = usage[toolId] || 0;

    return count < 999999;
  };

  // AI Suggestions
  const loadAISuggestions = async () => {
    if (!user?.email) return;

    try {
      const suggestions =
        await fetchAISuggestions(
          user.email
        );

      setAISuggestions(
        suggestions || []
      );
    } catch (err) {
      console.error(
        "Failed to load AI suggestions:",
        err
      );
    }
  };

  const value = {
    // Navigation
    view,
    setView,

    // Sidebar
    sidebarOpen,
    setSidebarOpen,

    // User
    user,
    setUser,

    // Plan
    plan,
    setPlan,

    // Loading
    loading,

    // Theme
    theme,
    setTheme,

    // Auth
    login,
    signup,
    logout,

    // Tools
    useTool,
    checkToolLimit,

    // Guest Limit
    guestUsageCount,
    incrementGuestUsage,
    resetGuestUsage,
    canUseTool,

    // AI
    aiSuggestions,
    loadAISuggestions,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};