import { useEffect, useState } from "react";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { pocketbase } from "@/lib/pocketbase";

interface PageData {
  content: any;
  root: any;
}

export default function PuckHome() {
  const slug = "home";
  // Start with empty Puck data so Puck renders immediately
  const [data, setData] = useState<PageData>({ content: [], root: {} });

  useEffect(() => {
    (async () => {
      try {
        const page = await pocketbase
          .collection("pages")
          .getFirstListItem(`slug="${slug}" && published=true`);
        let pageData: PageData = { content: [], root: {} };
        if (page.content_json) {
          if (typeof page.content_json === "string") pageData = JSON.parse(page.content_json);
          else if (typeof page.content_json === "object") pageData = page.content_json;
        }
        setData(pageData);
      } catch {
        // keep default empty data
      }
    })();
  }, []);

  return (
    <div className="min-h-screen">
      <Render config={puckConfig} data={data} />
    </div>
  );
}
