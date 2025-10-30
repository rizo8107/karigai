import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [el] = useState(() => document.createElement("div"));

  useEffect(() => {
    const root = document.body;
    el.setAttribute("data-plugin-portal", "");
    root.appendChild(el);
    setMounted(true);
    return () => {
      root.removeChild(el);
    };
  }, [el]);

  if (!mounted) return null;
  return createPortal(children, el);
}
