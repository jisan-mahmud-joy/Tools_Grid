// components/AdminDashboard.jsx
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    fetch("/api/analytics/stats").then(r => r.json()).then(setStats);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {stats.map(s => (
        <div key={s._id}>{s._id}: {s.count}</div>
      ))}
    </div>
  );
}