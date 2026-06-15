import React from "react";

const CookiePolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">
        Cookie Policy
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            What Are Cookies?
          </h2>

          <p>
            Cookies are small text files stored on your device
            to improve website functionality and user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            How We Use Cookies
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Remember user preferences</li>
            <li>Analyze website traffic</li>
            <li>Improve performance</li>
            <li>Support advertising services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            Third-Party Cookies
          </h2>

          <p>
            Google Analytics and Google AdSense may place cookies
            on your device to measure traffic and serve relevant ads.
          </p>
        </section>

      </div>
    </div>
  );
};

export default CookiePolicy;