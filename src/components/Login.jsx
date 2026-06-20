import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ================= VALIDATION =================
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = formData.email.trim();

    if (!trimmedEmail || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // ================= AUTH LOGIC =================
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        formData.password
      );

      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "User",
        })
      );

      toast.success("Log in successfully! 🔓");
      navigate("/");
    } catch (error) {
      console.error(error);

      // Firebase Error Handling
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Try again later.");
          break;
        default:
          toast.error("Login failed. Please try again.");
      }
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
          <p className="text-xs text-slate-400 mt-2">Access your secure dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Your Email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-600 hover:to-amber-500 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Secure Login 🔓"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          New user?{" "}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;