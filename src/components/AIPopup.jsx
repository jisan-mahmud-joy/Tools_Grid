import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function AIPopup() {
  const { aiSuggestions } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (aiSuggestions?.length > 0) {
      setOpen(true);
      const t = setTimeout(() => setOpen(false), 4000);
      return () => clearTimeout(t);
    }
  }, [aiSuggestions]);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-xl border border-white/10">
      🤖 {aiSuggestions?.[0] || "AI Suggestion"}
    </div>
  );
}