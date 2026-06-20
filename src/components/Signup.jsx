import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= VALIDATION =================
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameTrimmed || !emailTrimmed || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (nameTrimmed.length < 3) {
      toast.error("Name must be at least 3 characters long!");
      return;
    }

    if (!emailRegex.test(emailTrimmed)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    // ================= SIGNUP LOGIC =================
    setLoading(true);

    try {
      // ১. ইউজার তৈরি করা
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailTrimmed,
        formData.password
      );

      // ২. ইউজারের ডিসপ্লে নেম সেট করা
      await updateProfile(userCredential.user, {
        displayName: nameTrimmed,
      });

      // ৩. লোকাল স্টোরেজে তথ্য সেভ করা
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: userCredential.user.uid,
          name: nameTrimmed,
          email: emailTrimmed,
        })
      );

      toast.success(`Welcome ${nameTrimmed}! Account created successfully. 🎉`);
      
      // ড্যাশবোর্ডে পাঠানো
      navigate("/");
      window.location.reload(); 

    } catch (error) {
      console.error(error);

      // Firebase Error Handling
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered!");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;
        default:
          toast.error("Signup failed. Please try again.");
      }
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