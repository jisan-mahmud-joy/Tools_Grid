import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'সাইনআপ করতে সমস্যা হয়েছে!');
      }

      // টোকেন এবং ইউজার ডাটা লোকাল স্টোরেজে সেভ করা
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, isPremium: data.isPremium }));

      toast.success(`স্বাগতম ${data.name}! অ্যাকাউন্ট তৈরি সফল হয়েছে। 🎉`);
      navigate('/'); // ড্যাশবোর্ডে রিডাইরেক্ট
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent uppercase tracking-wider">
            Create Account
          </h2>
          <p className="text-xs text-slate-400 mt-2">ToolGrid প্রিমিয়াম ড্যাশবোর্ডে যোগ দিন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign Up 🚀'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          অলরেডি অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" className="text-amber-400 hover:underline">
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;