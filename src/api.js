// src/api.js

export const updateToolUsage = async (email, toolId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/analytics/track",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, toolId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Analytics tracking failed:", err);
    return null;
  }
};

export const fetchAISuggestions = async (email) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/ai/suggest?email=${encodeURIComponent(email)}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.suggestions || [];
  } catch (err) {
    console.error("AI suggestion fetch failed:", err);
    return [];
  }
};