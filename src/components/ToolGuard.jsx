import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ToolGuard = ({ children }) => {
  const { user, canUseTool } = useContext(AppContext);

  if (!user && !canUseTool) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ToolGuard;