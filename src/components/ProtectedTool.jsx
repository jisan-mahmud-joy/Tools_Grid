import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedTool = ({ children }) => {
  const { canUseTool, loading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // লোডিং শেষ হওয়ার আগে কিছুই করবে না
    if (!loading && !canUseTool) {
      toast.error("আপনার ৩টি ফ্রি ব্যবহার শেষ হয়েছে। অনুগ্রহ করে Login করুন।");
      navigate("/login");
    }
  }, [canUseTool, loading, navigate]);

  // যদি অ্যাপ লোড হতে থাকে, তবে একটি লোডিং স্ক্রিন দেখাও
  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedTool;