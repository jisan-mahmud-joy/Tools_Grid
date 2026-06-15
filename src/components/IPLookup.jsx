import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const IPLookup = () => {
const [ip, setIp] = useState("");
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

const { user, incrementGuestUsage } =
useContext(AppContext);

const handleLookup = async () => {
if (!ip.trim()) {
toast.error("Please enter an IP address");
return;
}

// Guest usage count
if (!user) {
  incrementGuestUsage();
}

setLoading(true);
setData(null);

try {
  const res = await fetch(
    `https://ipwho.is/${ip}`
  );

  const result = await res.json();

  if (!result.success) {
    toast.error("Invalid IP Address");
    setLoading(false);
    return;
  }

  setData(result);

  toast.success(
    "IP information loaded successfully 📍"
  );
} catch (error) {
  console.error(error);
  toast.error("Lookup failed");
}

setLoading(false);
```

};

const handleCopy = async () => {
if (!data) return;


const info = 


IP: ${data.ip}
Country: ${data.country}
Region: ${data.region}
City: ${data.city}
ISP: ${data.connection?.isp}
Organization: ${data.connection?.org}
Domain: ${data.connection?.domain}
Timezone: ${data.timezone?.id}
Latitude: ${data.latitude}
Longitude: ${data.longitude}
;

```
await navigator.clipboard.writeText(info);

toast.success(
  "Copied successfully 📋"
);


};

const handleClear = () => {
setIp("");
setData(null);
};

return ( <div className="max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl">


  <div className="mb-6">
    <h2 className="text-xl font-bold text-amber-400">
      Geo IP Lookup Panel
    </h2>

    <p className="text-xs text-slate-400 mt-1">
      Lookup IP address location,
      ISP, organization and timezone.
    </p>
  </div>

  <div className="flex gap-3 bg-slate-950/80 p-2 border border-white/10 rounded-xl mb-6">

    <input
      type="text"
      value={ip}
      onChange={(e) =>
        setIp(e.target.value)
      }
      placeholder="8.8.8.8"
      className="bg-transparent flex-1 px-3 text-sm text-slate-200 outline-none"
    />

    <button
      onClick={handleLookup}
      disabled={loading}
      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-lg"
    >
      {loading
        ? "Loading..."
        : "Lookup"}
    </button>

  </div>

  {data && (
    <>
      <div className="bg-slate-950/40 p-5 border border-white/5 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

        <p>
          <span className="text-slate-500">
            IP:
          </span>{" "}
          <span className="text-amber-400">
            {data.ip}
          </span>
        </p>

        <p>
          <span className="text-slate-500">
            Country:
          </span>{" "}
          {data.flag?.emoji}
          {" "}
          {data.country}
        </p>

        <p>
          <span className="text-slate-500">
            Country Code:
          </span>{" "}
          {data.country_code}
        </p>

        <p>
          <span className="text-slate-500">
            Region:
          </span>{" "}
          {data.region}
        </p>

        <p>
          <span className="text-slate-500">
            City:
          </span>{" "}
          {data.city}
        </p>

        <p>
          <span className="text-slate-500">
            Postal Code:
          </span>{" "}
          {data.postal}
        </p>

        <p>
          <span className="text-slate-500">
            Latitude:
          </span>{" "}
          {data.latitude}
        </p>

        <p>
          <span className="text-slate-500">
            Longitude:
          </span>{" "}
          {data.longitude}
        </p>

        <p>
          <span className="text-slate-500">
            Capital:
          </span>{" "}
          {data.capital}
        </p>

        <p>
          <span className="text-slate-500">
            ISP:
          </span>{" "}
          <span className="text-emerald-400">
            {data.connection?.isp}
          </span>
        </p>

        <p>
          <span className="text-slate-500">
            Organization:
          </span>{" "}
          {data.connection?.org}
        </p>

        <p>
          <span className="text-slate-500">
            Domain:
          </span>{" "}
          {data.connection?.domain}
        </p>

        <p>
          <span className="text-slate-500">
            Timezone:
          </span>{" "}
          {data.timezone?.id}
        </p>

        <p>
          <span className="text-slate-500">
            UTC:
          </span>{" "}
          {data.timezone?.utc}
        </p>

      </div>

      <div className="flex justify-end gap-3 mt-5">

        <button
          onClick={handleCopy}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
        >
          Copy
        </button>

        <button
          onClick={handleClear}
          className="px-5 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl"
        >
          Clear
        </button>

      </div>
    </>
  )}
</div>


);
};

export default IPLookup;
