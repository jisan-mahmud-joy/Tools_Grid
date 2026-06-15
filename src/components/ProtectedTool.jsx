import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedTool = ({ children }) => {
  const { canUseTool } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!canUseTool) {
      toast.error(
        "আপনার ৩টি ফ্রি ব্যবহার শেষ হয়েছে। অনুগ্রহ করে Login করুন।"
      );

      navigate("/login");
    }
  }, [canUseTool, navigate]);

  return children;
};

export default ProtectedTool;