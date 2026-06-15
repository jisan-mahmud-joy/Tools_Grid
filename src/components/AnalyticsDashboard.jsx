import React from "react";
import { getToolUsage } from "../utils/analytics";

export default function AnalyticsDashboard() {
  const data = getToolUsage();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tool Analytics</h2>

      {Object.keys(data).length === 0 && (
        <p className="text-slate-400">No usage yet</p>
      )}

      {Object.entries(data).map(([key, val]) => (
        <div key={key} className="flex justify-between p-2 bg-white/5 rounded mb-2">
          <span>{key}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}