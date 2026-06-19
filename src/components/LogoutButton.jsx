import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("লগআউট সফল হয়েছে! 👋");
      localStorage.removeItem('user'); // লোকাল স্টোরেজ ক্লিয়ার
      navigate('/login'); // লগইন পেজে পাঠিয়ে দাও
    } catch (error) {
      toast.error("লগআউটে সমস্যা হয়েছে!");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition duration-300"
    >
      Logout 🚪
    </button>
  );
};

export default LogoutButton;