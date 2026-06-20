import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AuthModal = ({ initialMode = 'login', onClose }) => {
  const { login, signup } = useContext(AppContext);

  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড টগল স্টেট

  // form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ===================== SUBMIT & VALIDATION =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ১. সাধারণ ভ্যালিডেশন
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // ২. সাইনআপ ভ্যালিডেশন
    if (mode === 'signup') {
      if (trimmedName.length < 3) {
        toast.error("Name must be at least 3 characters");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(trimmedEmail, password);
        if (res?.success) {
          toast.success('Login successful 🎉');
          onClose();
        } else {
          toast.error(res?.message || 'Login failed.');
        }
      } else {
        const res = await signup(trimmedName, trimmedEmail, password);
        if (res?.success) {
          toast.success('Account created successfully 🎉');
          setMode('login');
          setName('');
          setEmail('');
          setPassword('');
        } else {
          toast.error(res?.message || 'Signup failed.');
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
      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Login Workspace' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">✕</button>
        </div>

        {/* TOGGLE */}
        <div className="flex mb-6 bg-slate-800 rounded-lg p-1">
          <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${mode === 'login' ? 'bg-amber-500 text-black' : 'text-slate-400'}`}>Login</button>
          <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${mode === 'signup' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-amber-500 transition"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-amber-500 transition"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-amber-500 transition"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Create Account')}
          </button>
        </form>

        <p className="text-[10px] text-slate-600 mt-6 text-center tracking-wider uppercase font-semibold">
          JS Forge Technology Secure Auth System
        </p>
      </div>
    </div>
  );
};

export default AuthModal;