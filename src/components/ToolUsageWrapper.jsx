import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ToolUsageWrapper = ({ children, toolId }) => {
  const { checkToolLimit, useTool } = useContext(AppContext);

  // ⚠️ ডেভলপমেন্টের জন্য লিমিট এবং ইউসেজ কাউন্টার সাময়িকভাবে বাইপাস করা হলো
  /*
  const hasAccess = checkToolLimit(toolId);

  if (!hasAccess) {
    return (
      <div className="text-center p-10 bg-slate-900/50 rounded-2xl border border-white/5 mt-12 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-rose-400 mb-2">Limit Exceeded 🔒</h2>
        <p className="text-slate-400 text-xs mb-4">
          ফ্রি অ্যাকাউন্টের দৈনিক ব্যবহারের সীমা (৫ বার) শেষ হয়ে গেছে। আনলিমিটেড অ্যাক্সেস পেতে প্রিমিয়ামে আপগ্রেড করুন।
        </p>
      </div>
    );
  }
  */

  // টুলের যেকোনো অ্যাকশনে ইউসেজ কাউন্ট করার ফাংশন
  const handleToolAction = () => {
    if (typeof useTool === 'function') {
      useTool(toolId);
    }
  };

  return (
    <div onClick={handleToolAction}>
      {children}
    </div>
  );
};

export default ToolUsageWrapper;