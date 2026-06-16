import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";

const WhoisLookup = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, incrementGuestUsage } =
    useContext(AppContext);

  const handleLookup = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // Guest usage count increase
      if (!user) {
        incrementGuestUsage();
      }

      const cleanDomain = domain
        .replace("https://", "")
        .replace("http://", "")
        .split("/")[0];

      const res = await fetch(
        `https://rdap.org/domain/${cleanDomain}`
      );

      if (!res.ok) {
        throw new Error("Lookup failed");
      }

      const data = await res.json();

      setResult({
        domainName: data.ldhName || "N/A",
        handle: data.handle || "N/A",
        status: data.status || [],
        nameservers:
          data.nameservers?.map(
            (ns) => ns.ldhName
          ) || [],
      });

      toast.success("WHOIS data loaded");
    } catch (err) {
      console.error(err);
      toast.error("Domain lookup failed");
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setDomain("");
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900/40 p-6 rounded-2xl border border-white/10">
      
  <Helmet>
  <title>Free WHOIS Lookup Domain Tool | ToolGrid</title>
  <meta name="description" content="Get detailed domain registration information instantly. Use our free online WHOIS lookup tool to find ownership, expiration, and registrar details for any domain." />
</Helmet>

      <h2 className="text-2xl font-bold text-amber-400 mb-2">
        Domain WHOIS Lookup
      </h2>

      <p className="text-slate-400 mb-6">
        Get WHOIS information instantly.
      </p>

      <div className="flex gap-3 mb-6">

        <input
          value={domain}
          onChange={(e) =>
            setDomain(e.target.value)
          }
          placeholder="google.com"
          className="flex-1 p-3 rounded-xl bg-slate-950 border border-white/10 outline-none"
        />

        <button
          onClick={handleLookup}
          disabled={loading}
          className="px-5 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition"
        >
          {loading
            ? "Searching..."
            : "Lookup"}
        </button>

      </div>

      {result && (
        <div className="bg-slate-950 p-5 rounded-xl border border-white/10">

          <div className="space-y-4">

            <div>
              <p className="text-slate-400 text-sm">
                Domain Name
              </p>

              <p className="font-semibold">
                {result.domainName}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Handle
              </p>

              <p className="font-semibold">
                {result.handle}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">
                Status
              </p>

              <ul className="list-disc pl-5 space-y-1">
                {result.status.length > 0 ? (
                  result.status.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )
                ) : (
                  <li>No status found</li>
                )}
              </ul>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">
                Name Servers
              </p>

              <ul className="list-disc pl-5 space-y-1">
                {result.nameservers.length >
                0 ? (
                  result.nameservers.map(
                    (ns, index) => (
                      <li key={index}>
                        {ns}
                      </li>
                    )
                  )
                ) : (
                  <li>
                    No nameservers found
                  </li>
                )}
              </ul>
            </div>

            <button
              onClick={clearResult}
              className="mt-4 px-4 py-2 bg-slate-700 rounded-xl hover:bg-slate-600 transition"
            >
              Clear
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default WhoisLookup;