import React, {
  useState,
  useContext,
} from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";



const DuplicateRemover = () => {
  <Helmet>
  <title>Free Online Duplicate Remover Tool | ToolGrid</title>
  <meta name="description" content="Easily remove duplicate lines from your text or list. Clean up your data quickly with our free online duplicate remover tool, designed for efficiency and accuracy." />
</Helmet>
  const [text, setText] = useState("");
  const [result, setResult] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const [stats, setStats] =
    useState(null);

  const {
    user,
    incrementGuestUsage,
    useTool,
    checkToolLimit,
  } = useContext(AppContext);

  const handleRemoveDuplicates =
    async () => {
      if (!text.trim()) {
        toast.error(
          "Please enter some text first!"
        );
        return;
      }

      try {
        setLoading(true);

        if (!user) {
          incrementGuestUsage();
        } else {
          const allowed =
            checkToolLimit(
              "duplicate-remover"
            );

          if (!allowed) {
            toast.error(
              "Free plan limit reached! Upgrade to Premium 🚀"
            );
            setLoading(false);
            return;
          }

          await useTool(
            "duplicate-remover"
          );
        }

        const lines = text
          .split("\n")
          .map((line) =>
            line.trim()
          )
          .filter(Boolean);

        const uniqueLines = [
          ...new Set(lines),
        ];

        const originalCount =
          lines.length;

        const uniqueCount =
          uniqueLines.length;

        const removedCount =
          originalCount -
          uniqueCount;

        const output =
          uniqueLines.join("\n");

        setResult(output);

        setStats({
          original:
            originalCount,
          unique:
            uniqueCount,
          removed:
            removedCount,
        });

        if (removedCount > 0) {
          toast.success(
            `${removedCount} duplicate lines removed ✨`
          );
        } else {
          toast(
            "No duplicate lines found ℹ️"
          );
        }
      } catch (error) {
        console.error(error);

        toast.error(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleCopy =
    async () => {
      if (!result) return;

      try {
        await navigator.clipboard.writeText(
          result
        );

        toast.success(
          "Copied to clipboard 📋"
        );
      } catch {
        toast.error(
          "Copy failed"
        );
      }
    };

  const handleDownload =
    () => {
      if (!result) {
        toast.error(
          "No output available"
        );
        return;
      }

      const blob =
        new Blob(
          [result],
          {
            type: "text/plain",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;
      a.download =
        "duplicate-free.txt";

      a.click();

      URL.revokeObjectURL(
        url
      );

      toast.success(
        "Downloaded successfully ✅"
      );
    };

  const handleClear =
    () => {
      setText("");
      setResult("");
      setStats(null);

      toast.success(
        "Cleared successfully 🧹"
      );
    };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-amber-400">
            Duplicate Lines
            Remover
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Remove duplicate
            lines instantly
            from your text.
          </p>
        </div>

        {/* Input & Output */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-slate-400">
                Input Text
              </label>

              <span className="text-xs text-slate-500">
                {
                  text
                    .split("\n")
                    .filter(Boolean)
                    .length
                }{" "}
                lines
              </span>
            </div>

            <textarea
              value={text}
              onChange={(e) =>
                setText(
                  e.target.value
                )
              }
              placeholder="Paste your text here..."
              className="w-full h-72 p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 resize-none outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">

              <label className="text-xs uppercase tracking-wider text-slate-400">
                Output
              </label>

              {result && (
                <button
                  onClick={
                    handleCopy
                  }
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Copy
                </button>
              )}

            </div>

            <textarea
              value={result}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-72 p-4 bg-slate-950 border border-white/10 rounded-xl text-amber-300 resize-none"
            />
          </div>

        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mt-6">

            <div className="bg-slate-950 border border-white/10 rounded-xl p-4 text-center">

              <p className="text-xs text-slate-500 uppercase">
                Total
              </p>

              <p className="text-2xl font-bold">
                {stats.original}
              </p>

            </div>

            <div className="bg-slate-950 border border-white/10 rounded-xl p-4 text-center">

              <p className="text-xs text-emerald-500 uppercase">
                Unique
              </p>

              <p className="text-2xl font-bold text-emerald-400">
                {stats.unique}
              </p>

            </div>

            <div className="bg-slate-950 border border-white/10 rounded-xl p-4 text-center">

              <p className="text-xs text-rose-500 uppercase">
                Removed
              </p>

              <p className="text-2xl font-bold text-rose-400">
                {stats.removed}
              </p>

            </div>

          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end mt-6">

          <button
            onClick={
              handleClear
            }
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl"
          >
            Clear
          </button>

          <button
            onClick={
              handleDownload
            }
            disabled={!result}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl"
          >
            Download TXT
          </button>

          <button
            onClick={
              handleRemoveDuplicates
            }
            disabled={loading}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold rounded-xl"
          >
            {loading
              ? "Processing..."
              : "Remove Duplicates ✨"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default DuplicateRemover;