import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const getTimeTheme = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 9) return 'sunrise';
  if (hour >= 9 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'night';
};

const Home = ({ onLogin, onSignup }) => {
  const { user } = useContext(AppContext);
  const [theme, setTheme] = useState(getTimeTheme());

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getTimeTheme());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const bgClass = {
    sunrise: 'bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-300',
    day: 'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500',
    sunset: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500',
    night: 'bg-gradient-to-r from-slate-900 via-purple-900 to-black'
  };

  return (
    <div className={`min-h-screen text-white transition-all duration-1000 ${bgClass[theme]}`}>

      {/* HEADER */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-black">
          JS Forge Technology
        </h1>

        {!user && (
          <div className="space-x-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-white text-black rounded"
            >
              Login
            </button>

            <button
              onClick={onSignup}
              className="px-4 py-2 bg-black text-white border border-white"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* HERO */}
      <div className="text-center mt-20">
        <h2 className="text-5xl font-bold mb-4">
          12+ Powerful Developer Tools
        </h2>
        <p className="opacity-80">
          Free + Paid SaaS Platform with Smart Tool System
        </p>
      </div>

      {/* TOOL PREVIEW (LOCKED) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-10 mt-10">

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur"
          >
            🔒 Locked Tool
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="text-center p-6 text-sm opacity-70">
        © JS Forge Technology — All Rights Reserved
      </div>

    </div>
  );
};

export default Home;