import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-cyan-400">
            Contact Us
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Have questions, suggestions, or business inquiries?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-cyan-400 text-xl" />
                <span>support@jsforgetech.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-cyan-400 text-xl" />
                <span>+880 1XXXXXXXXX</span>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <a href="#" className="text-2xl hover:text-cyan-400">
                <FaFacebook />
              </a>

              <a href="#" className="text-2xl hover:text-cyan-400">
                <FaGithub />
              </a>

              <a href="#" className="text-2xl hover:text-cyan-400">
                <FaLinkedin />
              </a>

              <a href="#" className="text-2xl hover:text-cyan-400">
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Send Message
            </h2>

            <form className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 outline-none"
              />

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;