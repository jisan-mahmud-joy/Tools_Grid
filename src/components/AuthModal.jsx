import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AuthModal = ({ initialMode = 'login', onClose }) => {
  const { login, signup } = useContext(AppContext);

  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);

  // form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ===================== SUBMIT =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LOGIN
      if (mode === 'login') {
        // এখানে await যোগ করা হয়েছে ব্যাকএন্ড রেসপন্স নিশ্চিত করার জন্য
        const res = await login(email, password);

        if (res && res.success) {
          toast.success('Login successful 🎉');
          onClose();
        } else {
          toast.error(res?.message || 'Login failed. Please check credentials.');
        }
      }

      // SIGNUP
      else {
        // এখানেও await যোগ করা হয়েছে
        const res = await signup(name, email, password);

        if (res && res.success) {
          toast.success('Account created successfully 🎉');
          setMode('login'); // সাইনআপ সফল হলে লগইন মোডে নিয়ে যাবে
        } else {
          toast.error(res?.message || 'Signup failed. Email might already exist.');
        }
      }

    } catch (err) {
      console.error("Auth Error: ", err);
      toast.error('Something went wrong. Server connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">

      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Login Workspace' : 'Create Workspace Account'}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg transition"
          >
            ✕
          </button>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex mb-6 bg-slate-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition duration-200 ${
              mode === 'login'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition duration-200 ${
              mode === 'signup'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-amber-500/50 transition"
              required
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-amber-500/50 transition"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white outline-none focus:border-amber-500/50 transition"
            required
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-black hover:opacity-90 active:scale-[0.99] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/5"
          >
            {loading
              ? 'Connecting to Server...'
              : mode === 'login'
              ? 'Login to Workspace'
              : 'Initialize Account'}
          </button>

          {mode === 'login' && (
            <p className="text-[11px] text-center text-slate-500">
              Free accounts get limited daily API calls.
            </p>
          )}

        </form>

        {/* FOOTER TEXT */}
        <p className="text-[10px] text-slate-600 mt-6 text-center tracking-wider uppercase font-semibold">
          JS Forge Technology Secure Auth System
        </p>

      </div>
    </div>
  );
};

export default AuthModal;