import React, {
  useState,
  useContext,
} from "react";

import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet-async";



const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] =
    useState(true);

  const [includeNumbers, setIncludeNumbers] =
    useState(true);

  const [includeSymbols, setIncludeSymbols] =
    useState(true);

  const [password, setPassword] = useState("");

  const {
    user,
    incrementGuestUsage,
  } = useContext(AppContext);

  const generatePassword = () => {
    let charset =
      "abcdefghijklmnopqrstuvwxyz";

    if (includeUppercase) {
      charset +=
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeNumbers) {
      charset += "0123456789";
    }

    if (includeSymbols) {
      charset +=
        "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if (!charset.length) {
      toast.error(
        "Select at least one option"
      );
      return;
    }

    if (!user) {
      incrementGuestUsage();
    }

    let generated = "";

    const randomValues =
      new Uint32Array(length);

    window.crypto.getRandomValues(
      randomValues
    );

    for (
      let i = 0;
      i < length;
      i++
    ) {
      generated +=
        charset[
          randomValues[i] %
            charset.length
        ];
    }

    setPassword(generated);

    toast.success(
      "Secure password generated 🔐"
    );
  };

  const handleCopy = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(
      password
    );

    toast.success(
      "Copied to clipboard 📋"
    );
  };

  const handleClear = () => {
    setPassword("");
  };

  const getStrength = () => {
    if (!password) return "N/A";

    if (password.length < 8)
      return "Weak";

    if (password.length < 14)
      return "Medium";

    if (password.length < 20)
      return "Strong";

    return "Very Strong";
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">
      
  <Helmet>
  <title>Strong Password Generator - Secure Tool | ToolGrid</title>
  <meta name="description" content="Generate strong, secure, and random passwords instantly. Customize your security settings to create passwords that keep your accounts safe and protected." />
</Helmet>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-rose-400">
          Password Generator
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Generate strong and secure
          passwords instantly.
        </p>
      </div>

      <div className="flex gap-2 mb-6">

        <input
          type="text"
          value={password}
          readOnly
          placeholder="Generated password will appear here..."
          className="flex-1 p-3 bg-slate-950 border border-white/10 rounded-xl text-rose-400 font-mono"
        />

        {password && (
          <button
            onClick={handleCopy}
            className="px-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
          >
            Copy
          </button>
        )}

      </div>

      {password && (
        <div className="mb-5 text-sm">

          Strength:

          <span className="ml-2 text-amber-400 font-bold">
            {getStrength()}
          </span>

        </div>
      )}

      <div className="mb-6">

        <label className="block text-sm mb-2">
          Length: {length}
        </label>

        <input
          type="range"
          min="6"
          max="64"
          value={length}
          onChange={(e) =>
            setLength(
              Number(
                e.target.value
              )
            )
          }
          className="w-full"
        />

      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={
              includeUppercase
            }
            onChange={(e) =>
              setIncludeUppercase(
                e.target.checked
              )
            }
          />

          Uppercase

        </label>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={
              includeNumbers
            }
            onChange={(e) =>
              setIncludeNumbers(
                e.target.checked
              )
            }
          />

          Numbers

        </label>

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            checked={
              includeSymbols
            }
            onChange={(e) =>
              setIncludeSymbols(
                e.target.checked
              )
            }
          />

          Symbols

        </label>

      </div>

      <div className="flex gap-3">

        <button
          onClick={generatePassword}
          className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-amber-500 rounded-xl font-bold"
        >
          Generate Password
        </button>

        <button
          onClick={handleClear}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default PasswordGenerator;