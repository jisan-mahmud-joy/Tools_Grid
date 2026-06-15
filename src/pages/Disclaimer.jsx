import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">
        Disclaimer
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            General Information
          </h2>

          <p>
            All information and tools provided by JS Forge Technologies
            are for educational, informational, and productivity purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            No Guarantees
          </h2>

          <p>
            While we strive to keep our tools accurate and reliable,
            we make no guarantees regarding completeness,
            accuracy, or availability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-cyan-400 font-semibold mb-3">
            External Links
          </h2>

          <p>
            Our website may contain links to third-party websites.
            We are not responsible for the content or policies
            of those websites.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Disclaimer;