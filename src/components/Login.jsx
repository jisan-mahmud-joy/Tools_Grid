import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('ইমেইল এবং পাসওয়ার্ড দুটিই দিন!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'লগইন ব্যর্থ হয়েছে!');
      }

      // টোকেন ও ইউজার ডাটা লোকাল স্টোরেজে সেভ
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, isPremium: data.isPremium }));

      toast.success(`আবারও স্বাগতম, ${data.name}! 🔑`);
      navigate('/'); // হোম ড্যাশবোর্ডে পাঠানো
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
          <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent uppercase tracking-wider">
            User Login
          </h2>
          <p className="text-xs text-slate-400 mt-2">আপনার সিকিউর ড্যাশবোর্ডে অ্যাক্সেস করুন</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="jisan@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-amber-500 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Secure Login 🔓'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          নতুন ইউজার?{' '}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;