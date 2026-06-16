import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet-async";



const URLEncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const { user, incrementGuestUsage } =
    useContext(AppContext);

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error("অনুগ্রহ করে কিছু লিখুন!");
      return;
    }

    // Guest Count Increase
    if (!user) {
      incrementGuestUsage();
    }

    setOutput(
      encodeURIComponent(input)
    );

    toast.success(
      "URL Encode সফল হয়েছে! 🔗"
    );
  };

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error("অনুগ্রহ করে কিছু লিখুন!");
      return;
    }

    try {
      // Guest Count Increase
      if (!user) {
        incrementGuestUsage();
      }

      setOutput(
        decodeURIComponent(input)
      );

      toast.success(
        "URL Decode সফল হয়েছে! 🔓"
      );
    } catch {
      toast.error(
        "Invalid Encoded URL ❌"
      );
    }
  };

  const handleCopy = async () => {
    if (!output) return;

    await navigator.clipboard.writeText(
      output
    );

    toast.success(
      "কপি করা হয়েছে 📋"
    );
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
      
  <Helmet>
  <title>URL Encoder & Decoder Tool - Online | ToolGrid</title>
  <meta name="description" content="Safely encode and decode URL strings to ensure they are web-friendly. Use our free online URL encoder/decoder tool for quick and accurate results." />
</Helmet>

      <h2 className="text-xl font-bold text-amber-400 mb-6">
        URL Encoder / Decoder
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Input */}
        <div>
          <label className="text-xs text-slate-400 block mb-2">
            Input
          </label>

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Enter text or encoded URL..."
            className="w-full h-52 p-4 bg-slate-950 border border-white/10 rounded-xl"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-slate-400">
              Output
            </label>

            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-amber-400 hover:text-amber-300"
              >
                Copy
              </button>
            )}
          </div>

          <textarea
            readOnly
            value={output}
            className="w-full h-52 p-4 bg-slate-950 border border-white/10 rounded-xl"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end mt-6">

        <button
          onClick={handleClear}
          className="px-5 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
        >
          Clear
        </button>

        <button
          onClick={handleDecode}
          className="px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
        >
          Decode
        </button>

        <button
          onClick={handleEncode}
          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg"
        >
          Encode
        </button>

      </div>

    </div>
  );
};

export default URLEncoderDecoder;