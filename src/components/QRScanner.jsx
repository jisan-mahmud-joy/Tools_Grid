import React, {
  useState,
  useContext,
} from "react";

import jsQR from "jsqr";
import toast from "react-hot-toast";

import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";



const QRScanner = () => {
  <Helmet>
  <title>Online QR Code Scanner & Reader | ToolGrid</title>
  <meta name="description" content="Scan QR codes directly from your browser. Our free online QR scanner is fast, reliable, and helps you decode QR information instantly without any installation." />
</Helmet>
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    user,
    incrementGuestUsage,
  } = useContext(AppContext);

  const handleScan = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas =
          document.createElement("canvas");

        const ctx =
          canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData =
          ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

        const code = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (code) {

          // Guest usage count
          if (!user) {
            incrementGuestUsage();
          }

          setResult(code.data);

          toast.success(
            "QR Code Scanned Successfully"
          );
        } else {
          setResult("");

          toast.error(
            "No QR Code Found"
          );
        }

        setLoading(false);
      };

      img.onerror = () => {
        setLoading(false);

        toast.error(
          "Image load failed"
        );
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(
        result
      );

      toast.success("Copied");
    } catch {
      toast.error(
        "Copy failed"
      );
    }
  };

  const clearResult = () => {
    setResult("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/40 border border-white/5">

      <h2 className="text-2xl font-bold text-amber-400 mb-2">
        QR Code Scanner
      </h2>

      <p className="text-slate-400 text-sm mb-6">
        Upload a QR image and decode it instantly.
      </p>

      <label className="block border-2 border-dashed border-slate-600 rounded-xl p-10 text-center cursor-pointer hover:border-amber-400 transition">

        <input
          type="file"
          accept="image/*"
          onChange={handleScan}
          className="hidden"
        />

        <div className="text-5xl mb-3">
          📷
        </div>

        <p className="text-sm text-slate-300">
          Click To Upload QR Image
        </p>

      </label>

      {loading && (
        <div className="mt-6 text-center text-cyan-400">
          Scanning QR...
        </div>
      )}

      {result && (
        <div className="mt-6">

          <div className="bg-slate-950 p-4 rounded-xl border border-white/10">

            <h3 className="text-green-400 mb-3">
              Scanned Result
            </h3>

            <p className="break-all text-sm text-slate-300">
              {result}
            </p>

          </div>

          <div className="flex gap-3 mt-4">

            <button
              onClick={copyResult}
              className="px-5 py-2 bg-green-600 rounded-xl"
            >
              Copy Result
            </button>

            <button
              onClick={clearResult}
              className="px-5 py-2 bg-slate-700 rounded-xl"
            >
              Clear
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default QRScanner;