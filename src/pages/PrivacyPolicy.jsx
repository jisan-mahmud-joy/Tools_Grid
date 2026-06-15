import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-black text-cyan-400 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-slate-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Introduction
            </h2>

            <p>
              JS Forge Technologies respects your privacy.
              This Privacy Policy explains how we collect,
              use and protect your information when you use
              our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address (if provided)</li>
              <li>Browser and device information</li>
              <li>Usage analytics and performance data</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              How We Use Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Improve website performance</li>
              <li>Provide support services</li>
              <li>Analyze traffic and usage</li>
              <li>Enhance security and reliability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Cookies
            </h2>

            <p>
              We may use cookies to improve user experience,
              remember preferences and analyze traffic.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Third Party Services
            </h2>

            <p>
              We may use services such as Google Analytics,
              Google AdSense and other trusted providers.
              These services may collect information according
              to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Data Security
            </h2>

            <p>
              We take reasonable measures to protect user
              information from unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">
              Contact Us
            </h2>

            <p>
              Email: support@jsforgetech.com
            </p>
          </section>

          <section>
            <p className="text-slate-500 text-sm">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;