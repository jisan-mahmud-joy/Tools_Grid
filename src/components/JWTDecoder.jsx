import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";



const JWTDecoder = () => {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);

  const { user, incrementGuestUsage } =
    useContext(AppContext);

  const decodeBase64Url = (str) => {
    try {
      str = str.replace(/-/g, "+").replace(/_/g, "/");

      while (str.length % 4) {
        str += "=";
      }

      return JSON.parse(atob(str));
    } catch {
      return null;
    }
  };

  const handleDecode = () => {
    if (!token.trim()) {
      toast.error("Please paste a JWT token");
      return;
    }

    const parts = token.trim().split(".");

    if (parts.length !== 3) {
      toast.error("Invalid JWT format");
      return;
    }

    const decodedHeader =
      decodeBase64Url(parts[0]);

    const decodedPayload =
      decodeBase64Url(parts[1]);

    if (!decodedHeader || !decodedPayload) {
      toast.error("Failed to decode token");
      return;
    }

    // Guest Usage Count
    if (!user) {
      incrementGuestUsage();
    }

    setHeader(decodedHeader);
    setPayload(decodedPayload);

    toast.success(
      "JWT decoded successfully 🔓"
    );
  };

  const handleCopyPayload = async () => {
    if (!payload) return;

    await navigator.clipboard.writeText(
      JSON.stringify(payload, null, 2)
    );

    toast.success("Payload copied 📋");
  };

  const handleCopyHeader = async () => {
    if (!header) return;

    await navigator.clipboard.writeText(
      JSON.stringify(header, null, 2)
    );

    toast.success("Header copied 📋");
  };

  const handleClear = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">
      
  <Helmet>
  <title>JSON Web Token (JWT) Decoder Online | ToolGrid</title>
  <meta name="description" content="Decode and inspect JSON Web Tokens (JWT) easily. Our free online JWT decoder helps you debug and verify your tokens in a clean and readable format." />
</Helmet>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-rose-400">
          JWT Decoder
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Decode JSON Web Tokens instantly without sending data anywhere.
        </p>
      </div>

      <textarea
        value={token}
        onChange={(e) =>
          setToken(e.target.value)
        }
        placeholder="Paste JWT Token Here..."
        className="w-full h-40 p-4 bg-slate-950 border border-white/10 rounded-xl text-xs font-mono text-slate-300 resize-none"
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDecode}
          className="px-5 py-2 bg-rose-500 hover:bg-rose-600 rounded-xl font-bold"
        >
          Decode Token
        </button>

        <button
          onClick={handleClear}
          className="px-5 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl"
        >
          Clear
        </button>
      </div>

      {header && payload && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between mb-3">
              <h3 className="text-amber-400 font-bold">
                Header
              </h3>

              <button
                onClick={handleCopyHeader}
                className="text-xs text-slate-400"
              >
                Copy
              </button>
            </div>

            <pre className="text-xs text-slate-300 overflow-auto">
              {JSON.stringify(
                header,
                null,
                2
              )}
            </pre>
          </div>

          <div className="bg-slate-950 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between mb-3">
              <h3 className="text-emerald-400 font-bold">
                Payload
              </h3>

              <button
                onClick={handleCopyPayload}
                className="text-xs text-slate-400"
              >
                Copy
              </button>
            </div>

            <pre className="text-xs text-slate-300 overflow-auto">
              {JSON.stringify(
                payload,
                null,
                2
              )}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
};

export default JWTDecoder;