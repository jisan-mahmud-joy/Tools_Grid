import React, { useState, useContext } from "react";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";



const HashGenerator = () => {
 
const [text, setText] = useState("");
const [hashAlgo, setHashAlgo] = useState("SHA256");
const [result, setResult] = useState("");

const { user, incrementGuestUsage } =
useContext(AppContext);

const generateHash = () => {
if (!text.trim()) {
toast.error("Please enter some text");
return;
}


// Guest usage count
if (!user) {
  incrementGuestUsage();
}

let hash = "";

try {
  switch (hashAlgo) {
    case "MD5":
      hash = CryptoJS.MD5(text).toString();
      break;

    case "SHA1":
      hash = CryptoJS.SHA1(text).toString();
      break;

    case "SHA256":
      hash = CryptoJS.SHA256(text).toString();
      break;

    case "SHA512":
      hash = CryptoJS.SHA512(text).toString();
      break;

    default:
      hash = CryptoJS.SHA256(text).toString();
  }

  setResult(hash);

  toast.success(
    `${hashAlgo} Hash Generated 🔑`
  );
} catch (err) {
  console.error(err);
  toast.error(
    "Failed to generate hash"
  );
}


};

const handleCopy = async () => {
if (!result) return;


try {
  await navigator.clipboard.writeText(
    result
  );

  toast.success(
    "Copied to clipboard 📋"
  );
} catch {
  toast.error("Copy failed");
}


};

const handleDownload = () => {
if (!result) {
toast.error("No hash generated");
return;
}

const blob = new Blob(
  [result],
  {
    type: "text/plain",
  }
);

const url =
  URL.createObjectURL(blob);

const a =
  document.createElement("a");

a.href = url;

a.download =
  `${hashAlgo}-hash.txt`;

a.click();

URL.revokeObjectURL(url);

toast.success("Downloaded ✅");


};

const handleClear = () => {
setText("");
setResult("");
setHashAlgo("SHA256");


toast.success("Cleared 🧹");


};

return (
   <div className="max-w-4xl mx-auto p-6"> <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
     <Helmet>
  <title>Secure Hash Generator (MD5, SHA-256) | ToolGrid</title>
  <meta name="description" content="Generate secure hashes for your data instantly. Support for MD5, SHA-1, SHA-256, and more. Our free online hash generator ensures fast and accurate encryption." />
</Helmet>


    <div className="mb-6">
      <h1 className="text-2xl font-bold text-rose-400">
        Hash Generator
      </h1>

      <p className="text-sm text-slate-400 mt-2">
        Generate MD5, SHA-1,
        SHA-256 and SHA-512
        hashes instantly.
      </p>
    </div>

    <div>
      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
        Input Text
      </label>

      <textarea
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Enter text here..."
        className="w-full h-40 p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 resize-none outline-none"
      />
    </div>

    <div className="mt-2 text-right text-xs text-slate-500">
      Characters: {text.length}
    </div>

    <div className="grid md:grid-cols-2 gap-4 mt-6">

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
          Algorithm
        </label>

        <select
          value={hashAlgo}
          onChange={(e) =>
            setHashAlgo(
              e.target.value
            )
          }
          className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-slate-300"
        >
          <option value="MD5">
            MD5
          </option>

          <option value="SHA1">
            SHA-1
          </option>

          <option value="SHA256">
            SHA-256
          </option>

          <option value="SHA512">
            SHA-512
          </option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={generateHash}
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl"
        >
          Generate Hash
        </button>
      </div>

    </div>

    {result && (
      <div className="mt-8">

        <div className="flex justify-between items-center mb-2">

          <h3 className="text-sm font-semibold text-rose-400">
            Generated Hash
          </h3>

          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white"
          >
            Copy
          </button>

        </div>

        <div className="bg-slate-950 border border-white/10 rounded-xl p-4">

          <p className="text-xs font-mono text-slate-300 break-all">
            {result}
          </p>

        </div>

      </div>
    )}

    <div className="flex flex-wrap justify-end gap-3 mt-6">

      <button
        onClick={handleDownload}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
      >
        Download TXT
      </button>

      <button
        onClick={handleClear}
        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl"
      >
        Clear
      </button>

    </div>

  </div>
</div>


);
};

export default HashGenerator;
