// frontend/utils/toolUsage.js
import { updateToolUsage } from "../api";

export const getUserUsage = (email) => {
  const data = localStorage.getItem(`usage_${email}`);
  return data ? JSON.parse(data) : {};
};

export const incrementUsage = async (email, toolId) => {
  if (!email) return;
  
  const usage = getUserUsage(email);
  usage[toolId] = (usage[toolId] || 0) + 1;
  
  // Save to localStorage
  localStorage.setItem(`usage_${email}`, JSON.stringify(usage));

  // Send to backend (MongoDB)
  await updateToolUsage(email, toolId);

  return usage[toolId];
};