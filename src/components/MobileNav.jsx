import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { LayoutDashboard, Hash, QrCode, Settings } from "lucide-react";

export default function MobileNav() {
  const { setView } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden 
                    bg-black/80 backdrop-blur-xl border-t border-white/10
                    flex justify-around py-2">

      <button onClick={() => setView("dashboard")}>
        <LayoutDashboard />
      </button>

      <button onClick={() => setView("tool_hash")}>
        <Hash />
      </button>

      <button onClick={() => setView("tool_qr_gen")}>
        <QrCode />
      </button>

      <button>
        <Settings />
      </button>

    </div>
  );
}