import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Globe,
  QrCode,
  Scan,
  Trash2,
  FileSearch,
  Volume2,
  Link,
  Hash,
  MapPin,
  Key,
  ShieldAlert,
  ShieldCheck,
  ImageIcon,
  LayoutDashboard,
  X,
  Search,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    user,
    plan,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      title: "Whois Lookup",
      path: "/whois-lookup",
      icon: <Globe size={18} />,
    },
    {
      title: "QR Generator",
      path: "/qr-code-generator",
      icon: <QrCode size={18} />,
    },
    {
      title: "QR Scanner",
      path: "/qr-scanner",
      icon: <Scan size={18} />,
    },
    {
      title: "Duplicate Remover",
      path: "/duplicate-remover",
      icon: <Trash2 size={18} />,
    },
    {
      title: "Find & Replace",
      path: "/find-and-replace",
      icon: <FileSearch size={18} />,
    },
    {
      title: "Text To Speech",
      path: "/text-to-speech",
      icon: <Volume2 size={18} />,
    },
    {
      title: "URL Encode/Decode",
      path: "/url-encoder-decoder",
      icon: <Link size={18} />,
    },
    {
      title: "Favicon Generator",
      path: "/favicon-generator",
      icon: <ImageIcon size={18} />,
    },
    {
      title: "Hash Generator",
      path: "/hash-generator",
      icon: <Hash size={18} />,
    },
    {
      title: "IP Lookup",
      path: "/ip-lookup",
      icon: <MapPin size={18} />,
    },
    {
      title: "JWT Decoder",
      path: "/jwt-decoder",
      icon: <Key size={18} />,
    },
    {
      title: "Password Generator",
      path: "/password-generator",
      icon: <ShieldAlert size={18} />,
    },
    {
      title: "Password Strength",
      path: "/password-strength",
      icon: <ShieldCheck size={18} />,
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
        }}
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col justify-between
        bg-gradient-to-b from-slate-950 to-slate-900 border-r border-white/10 shadow-2xl
        ${collapsed ? "w-20" : "w-72"}`}
      >
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <img
                  src="/website-logo.jpg"
                  alt="Logo"
                  className="h-10 w-10 rounded-xl object-cover"
                />

                <div>
                  <h1 className="text-sm font-bold text-cyan-400">
                    Tools Grid
                  </h1>

                  <p className="text-[10px] text-slate-500">
                    Developer Tools
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                {collapsed ? (
                  <PanelLeft size={18} />
                ) : (
                  <PanelLeftClose size={18} />
                )}
              </button>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* SEARCH */}
          {!collapsed && (
            <div className="p-3">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl">
                <Search
                  size={16}
                  className="text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search tools..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </div>
          )}

          {/* DASHBOARD */}
          <div className="px-2 mb-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate("/");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition
              ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <LayoutDashboard size={18} />

              {!collapsed && (
                <span className="text-sm">
                  Dashboard
                </span>
              )}
            </motion.button>
          </div>

          {/* MENU */}
          <div className="px-2 space-y-1 overflow-y-auto max-h-[70vh]">
            {filteredItems.map((item) => {
              const active =
                location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition
                  ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {item.icon}

                  {!collapsed && (
                    <span className="text-sm truncate">
                      {item.title}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* USER */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
              {user?.name?.[0]?.toUpperCase() || "G"}
            </div>

            {!collapsed && (
              <div>
                <p className="text-sm text-white">
                  {user?.name || "Guest"}
                </p>

                <p className="text-xs text-slate-500">
                  {plan === "premium"
                    ? "Premium Plan"
                    : "Free Plan"}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;