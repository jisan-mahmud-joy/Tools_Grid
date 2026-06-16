import React, {
  useState,
  useContext,
} from "react";

import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  import { Helmet } from "react-helmet";



  const {
    user,
    incrementGuestUsage,
  } = useContext(AppContext);

  const calculateStrength = (pass) => {
    if (!pass) {
      return {
        score: 0,
        label: "No Password",
        color: "bg-slate-700",
      };
    }

    let score = 0;

    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[a-z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;

    let label = "Weak";
    let color = "bg-red-500";

    if (score >= 80) {
      label = "Strong";
      color = "bg-green-500";
    } else if (score >= 50) {
      label = "Medium";
      color = "bg-yellow-500";
    }

    return {
      score,
      label,
      color,
    };
  };

  const handleCheckStrength = () => {
    if (!password.trim()) {
      toast.error("Enter a password");
      return;
    }

    if (!user) {
      incrementGuestUsage();
    }

    setChecked(true);

    toast.success(
      "Password checked successfully"
    );
  };

  const handleClear = () => {
    setPassword("");
    setChecked(false);
  };

  const strength =
    calculateStrength(password);

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">
      
  <Helmet>
  <title>Password Strength Checker & Validator | ToolGrid</title>
  <meta name="description" content="Check the strength and security of your passwords in real-time. Our free online password strength checker helps you create safer credentials for your accounts." />
</Helmet>

      <h2 className="text-2xl font-bold text-rose-400 mb-2">
        Password Strength Checker
      </h2>

      <p className="text-slate-400 text-sm mb-6">
        Check how secure your password is.
      </p>

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="Enter your password..."
        className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 outline-none text-white"
      />

      <div className="flex gap-3 mt-4">

        <button
          onClick={handleCheckStrength}
          className="px-5 py-3 bg-rose-500 rounded-xl font-bold"
        >
          Check Strength
        </button>

        <button
          onClick={handleClear}
          className="px-5 py-3 bg-slate-700 rounded-xl"
        >
          Clear
        </button>

      </div>

      {checked && password && (
        <>
          <div className="mt-6">

            <div className="flex justify-between mb-2">

              <span className="text-sm text-slate-400">
                Password Strength
              </span>

              <span
                className={`font-bold ${
                  strength.label === "Strong"
                    ? "text-green-400"
                    : strength.label === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {strength.label}
              </span>

            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

              <div
                className={`${strength.color} h-full transition-all duration-500`}
                style={{
                  width: `${strength.score}%`,
                }}
              />

            </div>

          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">

            <div
              className={
                password.length >= 8
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              ✓ 8+ Characters
            </div>

            <div
              className={
                /[A-Z]/.test(password)
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              ✓ Uppercase Letter
            </div>

            <div
              className={
                /[a-z]/.test(password)
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              ✓ Lowercase Letter
            </div>

            <div
              className={
                /[0-9]/.test(password)
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              ✓ Number
            </div>

            <div
              className={
                /[^A-Za-z0-9]/.test(password)
                  ? "text-green-400"
                  : "text-slate-500"
              }
            >
              ✓ Special Character
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default PasswordStrengthChecker;