export const trackToolUsage = (toolId) => {
  const data = JSON.parse(localStorage.getItem("tool_usage") || "{}");

  data[toolId] = (data[toolId] || 0) + 1;

  localStorage.setItem("tool_usage", JSON.stringify(data));
};

export const getToolUsage = () => {
  return JSON.parse(localStorage.getItem("tool_usage") || "{}");
};