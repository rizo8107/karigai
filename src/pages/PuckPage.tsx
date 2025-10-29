import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { pocketbase } from "@/lib/pocketbase";

interface PageData {
  content: any;
  root: any;
}

export default function PuckPage() {
  const { slug } = useParams();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch page by slug
      const pages = await pocketbase.collection("pages").getFullList({
        filter: `slug = "${slug}" && published = true`,
      });

      if (pages.length === 0) {
        setError("Page not found");
        return;
      }

      const page = pages[0];

      // Parse content_json
      let pageData: PageData = { content: [], root: {} };
      
      if (page.content_json) {
        try {
          pageData = JSON.parse(page.content_json);
        } catch (parseError) {
          console.error("Error parsing page content:", parseError);
          setError("Failed to load page content");
          return;
        }
      }

      setData(pageData);
    } catch (err) {
      console.error("Error loading page:", err);
      setError("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

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

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">{error || "Page not found"}</p>
          <a href="/" className="text-primary hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Render config={puckConfig} data={data} />
    </div>
  );
}
