import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  { name: "Dashboard", path: "/" },
  { name: "QR Generator", path: "/qr-code-generator" },
  { name: "JWT Decoder", path: "/jwt-decoder" },
  { name: "IP Lookup", path: "/ip-lookup" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const key = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-start pt-32">
      <div className="bg-white/10 p-4 rounded-xl w-96">
        {tools.map((t) => (
          <div
            key={t.path}
            onClick={() => {
              navigate(t.path);
              setOpen(false);
            }}
            className="p-2 hover:bg-white/10 cursor-pointer"
          >
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}