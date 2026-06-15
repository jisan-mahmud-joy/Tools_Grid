import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useToolAccess = () => {
  const { user, usage, canUseTool, useTool, setView } = useContext(AppContext);

  const checkAccess = (toolId) => {
    // 1. login check
    if (!user) {
      return {
        allowed: false,
        reason: "LOGIN_REQUIRED"
      };
    }

    // 2. usage check (5 free limit)
    if (!canUseTool(toolId)) {
      return {
        allowed: false,
        reason: "LIMIT_EXCEEDED"
      };
    }

    return {
      allowed: true
    };
  };

  const activateTool = (toolId) => {
    const access = checkAccess(toolId);

    if (!access.allowed) return access;

    // increase usage
    useTool(toolId);

    return { allowed: true };
  };

  return {
    checkAccess,
    activateTool
  };
};