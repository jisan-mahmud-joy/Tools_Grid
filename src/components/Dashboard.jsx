import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const {
    plan,
    aiSuggestions,
    user,
    guestUsageCount,
  } = useContext(AppContext);

  const [timeTheme, setTimeTheme] =
  useState("night");

useEffect(() => {
  const updateTheme = () => {
    const hour =
      new Date().getHours();

    if (hour >= 5 && hour < 9) {
      setTimeTheme("morning");
    } else if (
      hour >= 9 &&
      hour < 17
    ) {
      setTimeTheme("day");
    } else if (
      hour >= 17 &&
      hour < 20
    ) {
      setTimeTheme("sunset");
    } else {
      setTimeTheme("night");
    }
  };

  updateTheme();

  const interval =
    setInterval(
      updateTheme,
      60000
    );

  return () =>
    clearInterval(interval);
}, []);

  const heroThemes = {
    morning: {
      bg: "from-orange-200 via-yellow-300 to-sky-300",
      glow1: "bg-yellow-400/30",
      glow2: "bg-orange-400/20",
      title: "🌅 Good Morning",
      text: "text-slate-900",
      desc: "text-slate-700",
    },

    day: {
      bg: "from-sky-400 via-cyan-500 to-blue-600",
      glow1: "bg-cyan-500/20",
      glow2: "bg-blue-500/20",
      title: "☀️ Good Day",
      text: "text-white",
      desc: "text-slate-100",
    },

    sunset: {
      bg: "from-orange-500 via-pink-500 to-purple-600",
      glow1: "bg-pink-500/30",
      glow2: "bg-orange-500/20",
      title: "🌇 Good Evening",
      text: "text-white",
      desc: "text-slate-100",
    },

    night: {
      bg: "from-slate-900 via-slate-950 to-black",
      glow1: "bg-cyan-500/10",
      glow2: "bg-blue-500/10",
      title: "🌙 Good Night",
      text: "text-white",
      desc: "text-slate-400",
    },
  };

  const currentTheme =
    heroThemes[timeTheme];

  const tools = [
    {
      name: "Duplicate Remover",
      path: "/duplicate-remover",
      icon: "🧹",
      desc: "Clean up your data by removing duplicate lines."
    },
    {
      name: "Favicon Generator",
      path: "/favicon-generator",
      icon: "🖼️",
      desc: "Generate professional favicons from images."
    },
    {
      name: "Find & Replace",
      path: "/find-and-replace",
      icon: "🔍",
      desc: "Search and replace text in large content."
    },
    {
      name: "Hash Generator",
      path: "/hash-generator",
      icon: "#️⃣",
      desc: "Generate MD5, SHA-1, SHA-256 hashes."
    },
    {
      name: "IP Lookup",
      path: "/ip-lookup",
      icon: "🌐",
      desc: "Track IP location and network details."
    },
    {
      name: "JWT Decoder",
      path: "/jwt-decoder",
      icon: "🔐",
      desc: "Decode and inspect JSON Web Tokens."
    },
    {
      name: "Password Generator",
      path: "/password-generator",
      icon: "🔑",
      desc: "Create secure, random passwords easily."
    },
    {
      name: "Password Strength",
      path: "/password-strength",
      icon: "🛡️",
      desc: "Test your password security strength." 
    },
    {
      name: "QR Generator",
      path: "/qr-code-generator",
      icon: "⚡",
      desc: "Generate custom QR codes for your URLs."
    },
    {
      name: "QR Scanner",
      path: "/qr-scanner",
      icon: "📷",
      esc: "Scan and decode QR codes instantly." 
    },
    {
      name: "Text To Speech",
      path: "/text-to-speech",
      icon: "🎤",
      desc: "Convert your written text into audio."
    },
    {
      name: "URL Encoder/Decoder",
      path: "/url-encoder-decoder",
      icon: "🔗",
      desc: "Encode or decode web-safe URLs."
    },
    {
      name: "Whois Lookup",
      path: "/whois-lookup",
      icon: "🌍",
      desc: "Check domain registration information."
    },
  ];

 return (
  <>
    <div className="p-6 max-w-7xl mx-auto">
      
  <Helmet>
    <title>
      JS Forge Tools | Free Developer Tools
    </title>

    <meta
      name="description"
      content="Free developer tools including QR Generator, JWT Decoder, Password Generator, Hash Generator, Whois Lookup and more."
    />

    <meta
      name="keywords"
      content="developer tools, qr generator, jwt decoder, password generator, hash generator, whois lookup"
    />

    <meta
      property="og:title"
      content="JS Forge Tools"
    />

    <meta
      property="og:description"
      content="Professional online developer tools platform."
    />

    <meta
      property="og:type"
      content="website"
    />
  </Helmet>

  {/* dashboard content */}

      {/* HERO */}
      <div
  className={`
  relative
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  p-8
  mb-10

  ${
    timeTheme === "morning"
      ? "bg-gradient-to-br from-orange-200 via-yellow-300 to-sky-300"
      : timeTheme === "day"
      ? "bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600"
      : timeTheme === "sunset"
      ? "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"
      : "bg-gradient-to-br from-slate-900 to-black"
  }
`}
>
  {/* MORNING */}
{timeTheme === "morning" && (
  <>
    <div className="absolute top-12 right-20 w-28 h-28 rounded-full bg-yellow-300 blur-sm animate-pulse" />

    <div className="absolute top-20 left-20 w-40 h-16 bg-white/50 rounded-full animate-bounce" />

    <div className="absolute top-36 left-52 w-32 h-12 bg-white/40 rounded-full animate-bounce" />
  </>
)}
{/* DAY */}
{timeTheme === "day" && (
  <>
    <div className="absolute top-10 right-20 w-36 h-36 rounded-full bg-yellow-300 shadow-[0_0_100px_rgba(255,255,0,0.8)] animate-pulse" />

    <div className="absolute top-32 left-16 w-44 h-16 bg-white/40 rounded-full animate-pulse" />

    <div className="absolute top-20 left-80 w-32 h-12 bg-white/30 rounded-full animate-pulse" />
  </>
)}
{/* SUNSET */}
{timeTheme === "sunset" && (
  <>
    <div className="absolute bottom-0 right-20 w-48 h-48 rounded-full bg-orange-400 blur-sm" />

    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-orange-500/30 to-transparent" />

    <div className="absolute top-20 left-20 w-40 h-16 bg-pink-300/20 rounded-full animate-pulse" />
  </>
)}
{/* NIGHT */}
{timeTheme === "night" && (
  <>
    <div className="absolute top-12 right-24 text-7xl">
      🌙
    </div>

    <div className="absolute top-20 left-20 text-white animate-pulse">
      ✦
    </div>

    <div className="absolute top-40 left-60 text-white animate-pulse">
      ✦
    </div>

    <div className="absolute top-28 right-60 text-white animate-pulse">
      ✦
    </div>

    <div className="absolute top-52 right-40 text-white animate-pulse">
      ✦
    </div>
  </>
)}
    <h1
  className={`text-5xl lg:text-7xl font-black drop-shadow-lg ${currentTheme.text}`}
>
  {currentTheme.title}
</h1>

<h2
  className={`text-3xl mt-4 font-bold ${currentTheme.text}`}
>
  Tools Grid 🚀
</h2>

    <p
      className={`mt-4 max-w-2xl ${currentTheme.desc}`}
    >
      Professional developer tools platform featuring
      QR Generator, JWT Decoder, Whois Lookup,
      Password Generator, Hash Generator,
      IP Lookup and more.
    </p>

          {/* PLAN */}
          <div className="mt-5">

            <span
              className={`px-4 py-2 rounded-full text-xs font-bold
              ${
                plan === "premium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}
            >
              {plan?.toUpperCase() || "FREE"} PLAN
            </span>

          </div>

          {/* LOGIN BUTTONS */}
          {!user && (
            <div className="flex gap-3 mt-6">

              <Link
                to="/login"
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
              >
                Sign Up
              </Link>

            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                {tools.length}
              </h3>

              <p className="text-slate-500 text-sm">
                Developer Tools
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                {user ? "∞" : "3"}
              </h3>

              <p className="text-slate-500 text-sm">
                Free Access
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                99.9%
              </h3>

              <p className="text-slate-500 text-sm">
                Uptime
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">
                AI
              </h3>

              <p className="text-slate-500 text-sm">
                Smart Features
              </p>
            </div>

          </div>

          {/* GUEST LIMIT */}
          {!user && (
            <div className="mt-6 p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10">

              <p className="text-cyan-300 text-sm">
                Free Tool Usage Remaining
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {Math.max(0, 3 - guestUsageCount)}/3
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                Log in to get unlimited tools access.
              </p>

            </div>
          )}

        </div>
      </div>

      {/* AI SUGGESTIONS */}
      {aiSuggestions?.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">

          <h2 className="font-semibold mb-3 text-lg">
            🤖 AI Suggestions
          </h2>

          <div className="flex flex-wrap gap-2">

            {aiSuggestions.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-300"
              >
                {item}
              </span>
            ))}

          </div>

        </div>
      )}

      {/* TOOLS SECTION */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold mb-2">
          Available Tools
        </h2>

        <p className="text-slate-500">
          Choose a tool and start working instantly.
        </p>

      </div>

      {/* TOOLS GRID */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.path}
           
  className={`
    relative
    isolate
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    p-8
    mb-10
    bg-gradient-to-br
    ${currentTheme.bg}
  `}
>

          
            <div className="text-4xl">
              {tool.icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              {tool.name}
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Open and use this developer tool instantly.
            </p>
          </Link>
        ))}
      </div>

    <Footer />
  </>
);
};

export default Dashboard;