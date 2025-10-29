import { useState, useEffect } from "react";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { useParams } from "react-router-dom";
import { pocketbase } from "@/lib/pocketbase";

interface PageData {
  content: any;
  root: any;
}

export default function PuckRenderer() {
  const { slug } = useParams();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPageData();
  }, [slug]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!slug) {
        throw new Error("No page slug provided");
      }

      // Load page by slug - check for published pages only
      const page = await pocketbase
        .collection("pages")
        .getFirstListItem(`slug="${slug}" && published=true`);
      
      // Parse content_json field
      let pageData: PageData = { content: [], root: {} };
      
      if (page.content_json) {
        try {
          // Check if it's already an object or a string
          if (typeof page.content_json === 'string') {
            pageData = JSON.parse(page.content_json);
          } else if (typeof page.content_json === 'object') {
            // Already an object, use it directly
            pageData = page.content_json;
          }
        } catch (parseError) {
          console.error("Error parsing page content:", parseError);
          throw new Error("Failed to load page content");
        }
      }
      
      setData(pageData);
    } catch (error) {
      console.error("Error loading page:", error);
      setError("Page not found");
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
          <p className="text-lg text-muted-foreground mb-8">
            {error || "Page not found"}
          </p>
          <a
            href="/"
            className="text-primary hover:text-primary/80 underline"
          >
            Go back home
          </a>
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
