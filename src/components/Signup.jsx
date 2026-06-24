import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";


const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ এখানে Firebase directly call করুন
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
      console.log("Success:", userCredential.user);
      toast.success("Account created! ✅");
      setIsSent(true);
    } catch (error) {
      console.error(error.code, error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ইমেল সাকসেসফুলি চলে গেলে এই স্ক্রিনটি দেখাবে
  if (isSent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/60 border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-white mb-2">Verify your Email</h2>
          <p className="text-sm text-slate-400 mb-6">
            We have sent a verification link to <span className="text-amber-400 font-semibold">{formData.email}</span>. Please click the link to activate your account.
          </p>
          <Link to="/login" className="inline-block px-6 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent uppercase tracking-wider">
            Create Account
          </h2>
          <p className="text-xs text-slate-400 mt-2">Join the ToolGrid Premium Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-amber-500/50 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign Up 🚀"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;