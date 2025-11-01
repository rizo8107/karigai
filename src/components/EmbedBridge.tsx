import { useEffect } from "react";
import { pocketbase } from "@/lib/pocketbase";

export default function EmbedBridge() {
  useEffect(() => {
    const post = () => {
      const h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      try {
        window.parent?.postMessage({ type: "ZENTHRA_EMBED_SIZE", height: h }, "*");
      } catch {}
    };

    // announce readiness (request auth if needed)
    try { window.parent?.postMessage({ type: "ZENTHRA_EMBED_READY" }, "*"); } catch {}
    post();
    const ro = new ResizeObserver(() => post());
    ro.observe(document.body);
    const onLoad = () => post();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", post);
    const interval = setInterval(post, 1000);

    const onMessage = (e: MessageEvent) => {
      const data = e.data as any;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'ZENTHRA_EMBED_AUTH' && data.token && data.model) {
        try {
          pocketbase.authStore.save(data.token, data.model);
          window.parent?.postMessage({ type: 'ZENTHRA_EMBED_AUTH_OK' }, '*');
          post();
        } catch {}
      }
    };
    window.addEventListener('message', onMessage);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", post);
      window.removeEventListener('message', onMessage);
      clearInterval(interval);
    };
  }, []);

  return null;
}
