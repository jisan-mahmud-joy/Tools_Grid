import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";

const getTimeTheme = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 9) return 'sunrise';
  if (hour >= 9 && hour < 17) return 'day';
  if (hour >= 17 && hour < 20) return 'sunset';
  return 'night';
};

const Home = ({ onLogin, onSignup }) => {
  const { user, canUseTool } = useContext(AppContext);
  const navigate = useNavigate();
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

  const tools = [
    { name: "Duplicate Remover", path: "/duplicate-remover" },
    { name: "Favicon Generator", path: "/favicon-generator" },
    { name: "Find and Replace", path: "/find-and-replace" },
    { name: "Hash Generator", path: "/hash-generator" },
    { name: "IP Lookup", path: "/ip-lookup" },
    { name: "JWT Decoder", path: "/jwt-decoder" },
    { name: "Password Generator", path: "/password-generator" },
    { name: "Password Strength", path: "/password-strength" },
    { name: "QR Code Generator", path: "/qr-code-generator" },
    { name: "QR Scanner", path: "/qr-scanner" },
    { name: "Text to Speech", path: "/text-to-speech" },
    { name: "URL Encoder/Decoder", path: "/url-encoder-decoder" },
    { name: "Whois Lookup", path: "/whois-lookup" }
  ];

  const handleToolClick = (path) => {
    if (canUseTool) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`min-h-screen text-white transition-all duration-1000 ${bgClass[theme]}`}>
      {/* HEADER */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-black">Tools Grid</h1>
        {!user && (
          <div className="space-x-3">
            <button onClick={onLogin} className="px-4 py-2 bg-white text-black rounded">Login</button>
            <button onClick={onSignup} className="px-4 py-2 bg-black text-white border border-white">Sign Up</button>
          </div>
        )}
      </div>

      {/* HERO */}
      <div className="text-center mt-20">
        <h2 className="text-5xl font-bold mb-4">13+ Powerful Developer Tools</h2>
        <p className="opacity-80">Free  SaaS Platform with Smart Tool System</p>
      </div>

      {/* TOOL LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-10 mt-10">
        {tools.map((tool, index) => (
          <div
            key={index}
            onClick={() => handleToolClick(tool.path)}
            className={`p-6 border rounded-xl backdrop-blur cursor-pointer transition-all ${
              canUseTool ? 'bg-white/20 border-white/40 hover:bg-white/30' : 'bg-white/10 border-white/20 opacity-70'
            }`}
          >
            {canUseTool ? tool.name : "🔒 Locked Tool"}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center p-6 text-sm opacity-70">
        
      </div>
      <Footer />
    </div>
  );
};

export default Home;