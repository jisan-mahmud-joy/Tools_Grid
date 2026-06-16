import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import { AppContext } from "./context/AppContext";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedTool from "./components/ProtectedTool";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import { initGA, pageView } from "./utils/analytics";

import DuplicateRemover from "./components/DuplicateRemover";
import FaviconGenerator from "./components/FaviconGenerator";
import FindAndReplace from "./components/FindAndReplace";
import HashGenerator from "./components/HashGenerator";
import IPLookup from "./components/IPLookup";
import JWTDecoder from "./components/JWTDecoder";
import PasswordGenerator from "./components/PasswordGenerator";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker";
import QRCodeGenerator from "./components/QRCodeGenerator";
import QRScanner from "./components/QRScanner";
import TextToSpeech from "./components/TextToSpeech";
import URLEncoderDecoder from "./components/URLEncoderDecoder";
import WhoisLookup from "./components/WhoisLookup";
import Home from "./components/Home";

import AIPopup from "./components/AIPopup";
import CommandPalette from "./components/CommandPalette";
import PageTransition from "./components/PageTransition";

import Success from "./pages/Success";

const App = () => {
const {
sidebarOpen,
setSidebarOpen,
user,
plan,
} = useContext(AppContext);

const location = useLocation();

// Google Analytics Init
useEffect(() => {
  initGA();
}, []);

// Page Tracking
useEffect(() => {
  pageView(location.pathname);
}, [location.pathname]);

// Ctrl + K
useEffect(() => {
  const handleKey = (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      alert("Command Palette (Future Upgrade 🔥)");
    }
  };

  window.addEventListener("keydown", handleKey);

  return () => {
    window.removeEventListener("keydown", handleKey);
  };
}, []);

return ( <div className="min-h-screen bg-[#030712] text-white flex">


  {/* Sidebar */}
  <Sidebar />

  {/* Main Area */}
  <div className="flex-1 flex flex-col min-h-screen">

    {/* Topbar */}
    <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-black/20 backdrop-blur sticky top-0 z-30">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-sm px-3 py-1 rounded bg-white/5 hover:bg-white/10"
      >
        ☰
      </button>

      <div className="text-xs text-slate-400">
        {user?.email || "Guest"} • {(plan || "free").toUpperCase()}
      </div>
    </div>

    {/* Content */}
    <main className="flex-1 overflow-y-auto">
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/"
              element={<Home/>}
            />

            {/* Auth */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* Protected Tools */}

            <Route
              path="/duplicate-remover"
              element={
                <ProtectedTool>
                  <DuplicateRemover />
                </ProtectedTool>
              }
            />

            <Route
              path="/favicon-generator"
              element={
                <ProtectedTool>
                  <FaviconGenerator />
                </ProtectedTool>
              }
            />

            <Route
              path="/find-and-replace"
              element={
                <ProtectedTool>
                  <FindAndReplace />
                </ProtectedTool>
              }
            />

            <Route
              path="/hash-generator"
              element={
                <ProtectedTool>
                  <HashGenerator />
                </ProtectedTool>
              }
            />

            <Route
              path="/ip-lookup"
              element={
                <ProtectedTool>
                  <IPLookup />
                </ProtectedTool>
              }
            />

            <Route
              path="/jwt-decoder"
              element={
                <ProtectedTool>
                  <JWTDecoder />
                </ProtectedTool>
              }
            />

            <Route
              path="/password-generator"
              element={
                <ProtectedTool>
                  <PasswordGenerator />
                </ProtectedTool>
              }
            />

            <Route
              path="/password-strength"
              element={
                <ProtectedTool>
                  <PasswordStrengthChecker />
                </ProtectedTool>
              }
            />

            <Route
              path="/qr-code-generator"
              element={
                <ProtectedTool>
                  <QRCodeGenerator />
                </ProtectedTool>
              }
            />

            <Route
              path="/qr-scanner"
              element={
                <ProtectedTool>
                  <QRScanner />
                </ProtectedTool>
              }
            />

            <Route
              path="/text-to-speech"
              element={
                <ProtectedTool>
                  <TextToSpeech />
                </ProtectedTool>
              }
            />

            <Route
              path="/url-encoder-decoder"
              element={
                <ProtectedTool>
                  <URLEncoderDecoder />
                </ProtectedTool>
              }
            />

            <Route
              path="/whois-lookup"
              element={
                <ProtectedTool>
                  <WhoisLookup />
                </ProtectedTool>
              }
            />

            <Route
              path="/success"
              element={<Success />}
            />

            <Route path="/about"
             element={<About />} 
             />

             <Route path="/contact" 
             element={<Contact />} 
             />

             <Route
             path="/privacy-policy"
             element={<PrivacyPolicy />}
            />

            <Route path="/terms" 
              element={<Terms />}
            />
            <Route path="/disclaimer" 
            element={<Disclaimer />}
             />

            <Route path="/cookie-policy"
             element={<CookiePolicy />}
              />

            <Route path="*"
             element={<NotFound />} 
             />

          </Routes>
        </PageTransition>
      </AnimatePresence>
    </main>

  </div>

  <Toaster position="top-right" />
  <AIPopup />
  <CommandPalette />
</div>


);
};

export default App;
