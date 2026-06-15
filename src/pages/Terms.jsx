import React from "react";

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">
        Terms & Conditions
      </h1>

      <div className="space-y-8">

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Acceptance of Terms
          </h2>

          <p>
            By accessing and using JS Forge Technologies, you agree
            to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Use of Services
          </h2>

          <p>
            Our tools are provided for educational, development,
            productivity, and informational purposes only.
          </p>

          <p className="mt-3">
            You agree not to use our services for unlawful,
            harmful, or abusive activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Intellectual Property
          </h2>

          <p>
            All content, branding, logos, software,
            and designs are the property of JS Forge Technologies
            unless otherwise stated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Limitation of Liability
          </h2>

          <p>
            We strive to provide reliable tools, but we do not
            guarantee uninterrupted service or complete accuracy.
          </p>

          <p className="mt-3">
            JS Forge Technologies shall not be liable for any
            direct or indirect damages arising from the use of
            our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Third-Party Services
          </h2>

          <p>
            Our website may contain links or integrations with
            third-party services. We are not responsible for
            their content or practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Changes to Terms
          </h2>

          <p>
            We reserve the right to modify these Terms at any time.
            Updated versions will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-3">
            Contact
          </h2>

          <p>
            If you have questions regarding these Terms,
            please contact us at:
          </p>

          <p className="mt-2 text-cyan-400">
            support@jsforgetech.com
          </p>
        </section>

        <div className="pt-6 border-t border-white/10 text-sm text-slate-500">
          Last Updated: {new Date().toLocaleDateString()}
        </div>

      </div>
    </div>
  );
};

export default Terms;