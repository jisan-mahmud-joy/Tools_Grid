import React, { useState, useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet-async";


const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(250);
  const [fgColor, setFgColor] = useState("#000000");
  const [generatedText, setGeneratedText] = useState("");

  const { user, incrementGuestUsage } =
    useContext(AppContext);

  const generateQR = () => {
    if (!text.trim()) {
      toast.error("Enter text or URL");
      return;
    }

    // Guest usage count
    if (!user) {
      incrementGuestUsage();
    }

    setGeneratedText(text);

    toast.success("QR Generated");
  };

  const handleDownload = () => {
    if (!generatedText) {
      toast.error("Generate QR first");
      return;
    }

    const svg =
      document.getElementById("qr-code");

    if (!svg) return;

    const svgData =
      new XMLSerializer().serializeToString(svg);

    const canvas =
      document.createElement("canvas");

    const ctx =
      canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        0,
        0,
        size,
        size
      );

      ctx.drawImage(
        img,
        0,
        0
      );

      const png =
        canvas.toDataURL(
          "image/png"
        );

      const link =
        document.createElement("a");

      link.href = png;

      link.download =
        `qr-${Date.now()}.png`;

      link.click();

      toast.success(
        "QR Downloaded"
      );
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(
        unescape(
          encodeURIComponent(
            svgData
          )
        )
      );
  };

  const clearAll = () => {
    setText("");
    setGeneratedText("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/40 border border-white/5">
      
  <Helmet>
        <title>Free QR Code Generator - Quick & Easy | ToolGrid</title>
        <meta name="description" content="Generate custom QR codes for URLs, text, and contacts instantly with ToolGrid's free online QR code generator. Easy, fast, and no registration required." />
      </Helmet>

      <h2 className="text-2xl font-bold text-amber-400 mb-2">
        QR Code Generator
      </h2>

      <p className="text-slate-400 text-sm mb-6">
        Generate QR codes instantly.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Left Side */}
        <div>

          <input
            type="text"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="https://example.com"
            className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 mb-4"
          />

          <div className="mb-4">
            <label className="block mb-2 text-sm">
              QR Color
            </label>

            <input
              type="color"
              value={fgColor}
              onChange={(e) =>
                setFgColor(
                  e.target.value
                )
              }
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm">
              Size
            </label>

            <select
              value={size}
              onChange={(e) =>
                setSize(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10"
            >
              <option value={150}>
                150 x 150
              </option>

              <option value={250}>
                250 x 250
              </option>

              <option value={350}>
                350 x 350
              </option>

              <option value={500}>
                500 x 500
              </option>
            </select>
          </div>

          <button
            onClick={generateQR}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold"
          >
            Generate QR
          </button>

        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center">

          {generatedText ? (
            <>
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  id="qr-code"
                  value={generatedText}
                  size={size}
                  fgColor={fgColor}
                  bgColor="#ffffff"
                  level="H"
                />
              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={
                    handleDownload
                  }
                  className="px-5 py-2 bg-green-600 rounded-xl"
                >
                  Download PNG
                </button>

                <button
                  onClick={clearAll}
                  className="px-5 py-2 bg-slate-700 rounded-xl"
                >
                  Clear
                </button>

              </div>
            </>
          ) : (
            <div className="text-slate-500 text-center">
              Click Generate QR
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default QRCodeGenerator;