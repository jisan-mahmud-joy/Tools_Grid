import React from "react";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-16">
        <span className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
          About JS Forge
        </span>

        <h1 className="text-5xl font-black mt-6">
          Building Tools For Developers 🚀
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-slate-400 text-lg">
          JS Forge Technologies creates modern developer tools,
          productivity solutions, and web applications designed
          to help developers, creators, startups, and businesses
          work faster and smarter.
        </p>
      </div>

      {/* Mission */}
      <div className="grid lg:grid-cols-2 gap-10 mb-16">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-slate-400 leading-8">
            Our mission is to provide free, fast, and reliable
            online tools that simplify everyday tasks for
            developers and digital professionals.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Our Vision
          </h2>

          <p className="text-slate-400 leading-8">
            We aim to build a complete ecosystem of tools and
            AI-powered solutions that empower creators around
            the world.
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="mb-16">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose JS Forge?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              ⚡ Fast Tools
            </h3>

            <p className="text-slate-400">
              Optimized for speed and performance.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Secure
            </h3>

            <p className="text-slate-400">
              Privacy-focused tools with secure processing.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🤖 Smart Features
            </h3>

            <p className="text-slate-400">
              AI-powered enhancements for productivity.
            </p>
          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">

        <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10">
          <h3 className="text-3xl font-bold text-cyan-400">
            15+
          </h3>
          <p className="text-slate-400">
            Developer Tools
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10">
          <h3 className="text-3xl font-bold text-cyan-400">
            Free
          </h3>
          <p className="text-slate-400">
            Forever Access
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10">
          <h3 className="text-3xl font-bold text-cyan-400">
            24/7
          </h3>
          <p className="text-slate-400">
            Online Availability
          </p>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 text-center border border-white/10">
          <h3 className="text-3xl font-bold text-cyan-400">
            AI
          </h3>
          <p className="text-slate-400">
            Smart Solutions
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10">

        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore?
        </h2>

        <p className="text-slate-400 mb-6">
          Discover powerful tools built for developers.
        </p>

        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
        >
          Go To Dashboard
        </a>

      </div>

    </div>
  );
};

export default About;