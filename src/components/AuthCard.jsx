import React from "react";

export default function AuthCard({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">

      <div className="w-[380px] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          {title}
        </h2>

        {children}

      </div>
    </div>
  );
}