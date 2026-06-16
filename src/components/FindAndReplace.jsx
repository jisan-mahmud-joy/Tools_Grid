import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Helmet } from "react-helmet";


const FindAndReplace = () => {
  <Helmet>
  <title>Online Find and Replace Text Tool | ToolGrid</title>
  <meta name="description" content="Quickly find and replace specific text within your document. Our free online find and replace tool helps you edit large amounts of text in seconds." />
</Helmet>
const [text, setText] = useState("");
const [findWord, setFindWord] = useState("");
const [replaceWord, setReplaceWord] = useState("");
const [caseSensitive, setCaseSensitive] = useState(false);

const [stats, setStats] = useState({
replacedCount: 0,
});

const { user, useTool, checkToolLimit } =
useContext(AppContext);

const handleReplace = async () => {
if (!text.trim()) {
toast.error("Please enter some text first.");
return;
}


if (!findWord.trim()) {
  toast.error("Enter a word to find.");
  return;
}

try {
  if (user) {
    const allowed =
      checkToolLimit("find-and-replace");

    if (!allowed) {
      toast.error(
        "Free plan limit reached! Upgrade to Premium 🚀"
      );
      return;
    }

    await useTool("find-and-replace");
  }

  const flags = caseSensitive
    ? "g"
    : "gi";

  const escapedFindWord =
    findWord.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );

  const regex = new RegExp(
    escapedFindWord,
    flags
  );

  const matches =
    text.match(regex);

  const count = matches
    ? matches.length
    : 0;

  if (count === 0) {
    toast.error(
      "No matching text found."
    );
    return;
  }

  const updatedText =
    text.replace(
      regex,
      replaceWord
    );

  setText(updatedText);

  setStats({
    replacedCount: count,
  });

  toast.success(
    `${count} replacements completed 🎉`
  );
} catch (error) {
  console.error(error);
  toast.error(
    "Replacement failed"
  );
}
```

};

const handleCopy = async () => {
if (!text) return;

```
try {
  await navigator.clipboard.writeText(
    text
  );

  toast.success(
    "Copied to clipboard 📋"
  );
} catch {
  toast.error("Copy failed");
}
```

};

const handleDownload = () => {
if (!text) {
toast.error(
"Nothing to download"
);
return;
}

```
const blob = new Blob(
  [text],
  {
    type: "text/plain",
  }
);

const url =
  URL.createObjectURL(blob);

const a =
  document.createElement("a");

a.href = url;
a.download =
  "find-replace-result.txt";

document.body.appendChild(a);
a.click();
document.body.removeChild(a);

URL.revokeObjectURL(url);

toast.success(
  "File downloaded ✅"
);


};

const handleClear = () => {
setText("");
setFindWord("");
setReplaceWord("");


setStats({
  replacedCount: 0,
});

toast.success(
  "Everything cleared 🧹"
);


};

return ( <div className="max-w-5xl mx-auto p-6">


  <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

    <div className="mb-6">
      <h1 className="text-2xl font-bold text-amber-400">
        Find & Replace
      </h1>

      <p className="text-sm text-slate-400 mt-2">
        Quickly find and replace words
        inside large text blocks.
      </p>
    </div>

    <div>
      <div className="flex justify-between items-center mb-2">

        <label className="text-xs uppercase tracking-wider text-slate-400">
          Text Editor
        </label>

        {text && (
          <button
            onClick={handleCopy}
            className="text-xs text-amber-400 hover:text-amber-300"
          >
            Copy Text
          </button>
        )}

      </div>

      <textarea
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
        placeholder="Paste your text here..."
        className="w-full h-64 p-4 bg-slate-950 border border-white/10 rounded-xl text-slate-200 resize-none outline-none focus:border-amber-500"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-4 mt-6">

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
          Find
        </label>

        <input
          type="text"
          value={findWord}
          onChange={(e) =>
            setFindWord(
              e.target.value
            )
          }
          placeholder="Word to find"
          className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-slate-200 outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">
          Replace With
        </label>

        <input
          type="text"
          value={replaceWord}
          onChange={(e) =>
            setReplaceWord(
              e.target.value
            )
          }
          placeholder="Replacement word"
          className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-slate-200 outline-none focus:border-amber-500"
        />
      </div>

    </div>

    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">

      <label className="flex items-center gap-3 cursor-pointer">

        <input
          type="checkbox"
          checked={
            caseSensitive
          }
          onChange={(e) =>
            setCaseSensitive(
              e.target.checked
            )
          }
          className="accent-amber-500"
        />

        <span className="text-sm text-slate-400">
          Case Sensitive
        </span>

      </label>

      <button
        onClick={handleReplace}
        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl"
      >
        Replace All
      </button>

    </div>

    {stats.replacedCount > 0 && (
      <div className="mt-6 bg-slate-950 border border-white/10 rounded-xl p-4 text-center">

        <p className="text-slate-300">
          Replaced
          <span className="text-emerald-400 font-bold mx-1">
            {stats.replacedCount}
          </span>
          occurrence(s)
        </p>

      </div>
    )}

    <div className="flex flex-wrap justify-end gap-3 mt-6">

      <button
        onClick={handleDownload}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
      >
        Download TXT
      </button>

      <button
        onClick={handleClear}
        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl"
      >
        Clear
      </button>

    </div>

  </div>

</div>


);
};

export default FindAndReplace;
