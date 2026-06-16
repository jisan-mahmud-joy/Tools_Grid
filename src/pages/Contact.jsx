import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import toast from "react-hot-toast"; // নোটিফিকেশনের জন্য

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // এখানে তোমার কি দাও

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message Sent Successfully! ✅");
      event.target.reset();
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-cyan-400">Contact Us</h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Have questions, suggestions, or business inquiries? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-cyan-400 text-xl" />
                <span>jsforgetechnologysupport@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-cyan-400 text-xl" />
                <span>+880 1825017393</span>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="https://www.facebook.com/share/1boxUuFsgY/" className="text-2xl hover:text-cyan-400 transition"><FaFacebook /></a>
              <a href="https://www.linkedin.com/in/support-js-forge-technology-a63186417?trk=contact-info" className="text-2xl hover:text-cyan-400 transition"><FaLinkedin /></a>
              <a href="https://www.youtube.com/@JSForgeTechnology" className="text-2xl hover:text-cyan-400 transition"><FaYoutube /></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-500" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-500" />
              <textarea name="message" rows="5" placeholder="Your Message" required className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-500" />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;