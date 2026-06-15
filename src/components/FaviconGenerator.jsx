import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const FaviconGenerator = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    user,
    incrementGuestUsage,
    useTool,
    checkToolLimit,
  } = useContext(AppContext);

  const sizes = [16, 32, 48, 64, 128, 256];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
      toast.success("Image uploaded successfully 🖼️");
    };

    reader.onerror = () => {
      toast.error("Failed to read image.");
    };

    reader.readAsDataURL(file);
  };

  const downloadFavicon = async (size) => {
    if (!imageSrc) {
      toast.error("Upload an image first.");
      return;
    }

    try {
      setLoading(true);

      if (!user) {
        incrementGuestUsage();
      } else {
        const allowed =
          checkToolLimit("favicon-generator");

        if (!allowed) {
          toast.error(
            "Free plan limit reached! Upgrade to Premium 🚀"
          );
          setLoading(false);
          return;
        }

        await useTool("favicon-generator");
      }

      const canvas =
        document.createElement("canvas");

      const ctx = canvas.getContext("2d");

      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(
          0,
          0,
          size,
          size
        );

        ctx.drawImage(
          img,
          0,
          0,
          size,
          size
        );

        const link =
          document.createElement("a");

        link.href =
          canvas.toDataURL("image/png");

        link.download =
          `favicon-${size}x${size}.png`;

        link.click();

        toast.success(
          `${size}x${size} favicon downloaded ✅`
        );

        setLoading(false);
      };

      img.onerror = () => {
        toast.error("Image processing failed");
        setLoading(false);
      };

      img.src = imageSrc;
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImageSrc(null);
    toast.success("Image cleared 🧹");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-400">
            Favicon Generator
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Convert any image into favicon sizes instantly.
          </p>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center bg-slate-950/40">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-slate-300"
          />

          <p className="text-xs text-slate-500 mt-3">
            JPG, PNG, WEBP supported
          </p>

        </div>

        {/* Preview */}
        {imageSrc && (
          <>
            <div className="mt-8 flex justify-center">

              <div className="bg-slate-950 border border-white/10 rounded-2xl p-6">

                <img
                  src={imageSrc}
                  alt="Preview"
                  className="w-36 h-36 object-contain"
                />

              </div>

            </div>

            {/* Size Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">

              {sizes.map((size) => (
                <div
                  key={size}
                  className="bg-slate-950 border border-white/10 rounded-xl p-4 text-center"
                >

                  <p className="text-xs text-slate-400 mb-4">
                    {size} × {size}
                  </p>

                  <img
                    src={imageSrc}
                    alt="favicon"
                    style={{
                      width: `${Math.max(
                        size / 2,
                        20
                      )}px`,
                      height: `${Math.max(
                        size / 2,
                        20
                      )}px`,
                    }}
                    className="mx-auto object-contain"
                  />

                  <button
                    disabled={loading}
                    onClick={() =>
                      downloadFavicon(size)
                    }
                    className="mt-4 w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded-lg"
                  >
                    {loading
                      ? "Processing..."
                      : "Download"}
                  </button>

                </div>
              ))}

            </div>

            {/* Actions */}
            <div className="flex justify-end mt-8">

              <button
                onClick={handleClear}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Clear
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default FaviconGenerator;