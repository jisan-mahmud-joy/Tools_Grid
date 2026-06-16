
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Top Section */}
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">

          {/* Company */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-4 mb-5">
              <img
                src="/company-logo.jpeg"
                alt="JS Forge Technologies"
                className="w-16 h-16 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold text-cyan-400">
                  JS Forge Technologies
                </h2>

                <p className="text-xs text-slate-500">
                  Build • Innovate • Empower
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-7 max-w-md">
              JS Forge Technologies develops modern developer tools,
              productivity software, web applications and AI-powered
              solutions that help creators, startups and businesses
              build faster and smarter.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 transition"
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">

              <li>
                <Link to="./Home" className="hover:text-cyan-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="./dashboard" className="hover:text-cyan-400">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/password-generator"
                  className="hover:text-cyan-400"
                >
                  Password Generator
                </Link>
              </li>

              <li>
                <Link
                  to="/qr-code-generator"
                  className="hover:text-cyan-400"
                >
                  QR Generator
                </Link>
              </li>

              <li>
                <Link
                  to="/whois-lookup"
                  className="hover:text-cyan-400"
                >
                  Whois Lookup
                </Link>
              </li>
              <li>
  <Link
    to="/about"
    className="hover:text-cyan-400"
  >
    About Us
  </Link>
</li>
<li>
  <Link
    to="/contact"
    className="hover:text-cyan-400"
  >
    Contact Us
  </Link>
</li>

            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Popular Tools
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">

              <li>JWT Decoder</li>
              <li>Hash Generator</li>
              <li>IP Lookup</li>
              <li>QR Scanner</li>
              <li>Text To Speech</li>
              <li>URL Encoder</li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              Get updates about new tools and features.
            </p>

            <div className="flex">

              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-xl text-sm outline-none"
              />

              <button
                className="px-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-r-xl"
              >
                <FaArrowRight />
              </button>

            </div>

            <div className="mt-6 space-y-2 text-sm text-slate-400">
              <p>📧 jsforgetechnologysupport@gmail.com</p>
              <p>🌍 Dhaka, Bangladesh</p>
              <p>🕒 24/7 Online Support</p>
            </div>
          </div>

        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mt-14">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h4 className="text-2xl font-bold text-cyan-400">
              13+
            </h4>
            <p className="text-slate-400 text-sm">
              Developer Tools
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h4 className="text-2xl font-bold text-cyan-400">
              10K+
            </h4>
            <p className="text-slate-400 text-sm">
              Monthly Users
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h4 className="text-2xl font-bold text-cyan-400">
              99.9%
            </h4>
            <p className="text-slate-400 text-sm">
              Uptime
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h4 className="text-2xl font-bold text-cyan-400">
              Free
            </h4>
            <p className="text-slate-400 text-sm">
              Forever Tools
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} JS Forge Technologies.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">

            <div className="flex gap-6 text-sm text-slate-500">

  <Link to="/privacy-policy">
    Privacy Policy
  </Link>

  <Link to="/terms">
    Terms of Service
  </Link>

  <Link to="/cookie-policy">
    Cookie Policy
  </Link>

  <Link to="/disclaimer">
    Disclaimer
  </Link>

</div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

