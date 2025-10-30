import { useEffect, useState } from "react";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { pocketbase } from "@/lib/pocketbase";

interface PageData {
  content: any;
  root: any;
}

export default function PuckBySlug({ slug }: { slug: string }) {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const page = await pocketbase
          .collection("pages")
          .getFirstListItem(`slug="${slug}" && published=true`);

        let pageData: PageData = { content: [], root: {} };
        if (page.content_json) {
          if (typeof page.content_json === "string") pageData = JSON.parse(page.content_json);
          else if (typeof page.content_json === "object") pageData = page.content_json;
        }
        setData(pageData);
      } catch (e) {
        setError("Page not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !data) return null;

  return (
    <div className="min-h-screen">
      <Render config={puckConfig} data={data} />
    </div>
  );
}
