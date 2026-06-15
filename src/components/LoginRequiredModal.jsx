import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-cyan-500/20 rounded-3xl p-6">

        <div className="text-center">

          <div className="text-6xl mb-4">🔒</div>

          <h2 className="text-2xl font-bold text-white">
            Free Limit Reached
          </h2>

          <p className="text-slate-400 mt-3">
            আপনি ৩ বার ফ্রি টুল ব্যবহার করেছেন।
            এখন ToolGrid ব্যবহার চালিয়ে যেতে Login করুন।
          </p>

          <div className="mt-6 space-y-3">

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold"
            >
              Login Now
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="w-full py-3 rounded-xl border border-white/10"
            >
              Create Free Account
            </button>

            <button
              onClick={onClose}
              className="text-slate-500 text-sm"
            >
              Close
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginRequiredModal;