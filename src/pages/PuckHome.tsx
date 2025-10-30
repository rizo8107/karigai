import { useEffect, useState } from "react";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { pocketbase } from "@/lib/pocketbase";
import Index from "./Index";

interface PageData {
  content: any;
  root: any;
}

export default function PuckHome() {
  const slug = "home";
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const page = await pocketbase
          .collection("pages")
          .getFirstListItem(`slug="${slug}" && published=true`);
        let pageData: PageData = { content: [], root: {} };
        if (page.content_json) {
          if (typeof page.content_json === "string") pageData = JSON.parse(page.content_json);
          else if (typeof page.content_json === "object") pageData = page.content_json;
        }
        setData(pageData);
        setFound(true);
      } catch {
        setFound(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Index />; // show normal home while deciding
  if (!found || !data) return <Index />;

  return (
    <div className="min-h-screen">
      <Render config={puckConfig} data={data} />
    </div>
  );
}
