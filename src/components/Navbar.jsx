import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu } from 'lucide-react';

const Navbar = () => {
  // AppContext থেকে sidebar ওপেন করার ফাংশনটি নিচ্ছি
  const { setSidebarOpen } = useContext(AppContext);

  return (
    <nav className="h-16 bg-slate-950 border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* বাম পাশ: হ্যামবার্গার মেনু বাটন */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
        >
          <Menu size={22} />
        </button>
        
        {/* লোগো/ব্র্যান্ড নেম */}
        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
          TOOL<span className="text-amber-500">GRID</span>
        </Link>
      </div>

      {/* ডান পাশ: লগইন ও সাইনআপ */}
      <div className="flex items-center gap-3">
        <Link 
          to="/login" 
          className="text-sm font-medium text-slate-400 hover:text-white transition"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="text-sm font-semibold bg-amber-500 text-black px-4 py-2 rounded-xl hover:bg-amber-400 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;