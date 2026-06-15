import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  // ⚠️ ডেভলপমেন্টের জন্য সাময়িকভাবে লগইন চেক বাইপাস করা হলো
  // আসল প্রোডাকশনে এই নিচের কমেন্ট করা কোডটি সচল হবে:
  /*
  if (!user) {
    return (
      <div className="text-center p-10 bg-slate-900/50 rounded-2xl border border-white/5 mt-12">
        <h2 className="text-xl font-bold text-white mb-2">Login Required</h2>
        <p className="text-slate-400 text-sm">এই টুল ব্যবহার করতে আগে লগইন করতে হবে</p>
      </div>
    );
  }
  */

  // সরাসরি চাইল্ড কম্পোনেন্ট (টুল) রেন্ডার করতে দেওয়া হচ্ছে
  return <>{children}</>;
};

export default ProtectedRoute;