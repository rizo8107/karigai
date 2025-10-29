import { useState, useEffect } from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { pocketbase } from "@/lib/pocketbase";

interface PageData {
  content: any;
  root: any;
}

export default function PuckEditor() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<PageData>({ content: [], root: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPageData();
  }, [pageId]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      
      if (pageId && pageId !== "new") {
        // Load existing page
        const page = await pocketbase.collection("pages").getOne(pageId);
        
        // Parse content_json if it exists
        let pageData = { content: [], root: {} };
        
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
            console.error("Error parsing content_json:", parseError);
            // Fallback to empty page
            pageData = { content: [], root: {} };
          }
        }
        
        // Ensure content is an array
        if (!Array.isArray(pageData.content)) {
          pageData.content = [];
        }
        
        // Filter out any invalid components
        pageData.content = pageData.content.filter((item: any) => {
          // Check if the component type exists in our config
          return item && item.type && puckConfig.components[item.type];
        });
        
        setData(pageData);
      } else {
        // New page with completely empty data
        setData({
          content: [],
          root: {},
        });
      }
    } catch (error) {
      console.error("Error loading page data:", error);
      setData({ content: [], root: {} });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (newData: PageData) => {
    try {
      setSaving(true);
      
      const pageData = {
        title: newData.root?.title || "Untitled Page",
        slug: generateSlug(newData.root?.title || "untitled-page"),
        content_json: JSON.stringify(newData), // Store as JSON string
        published: true, // Set published flag to true
        status: "published",
      };

      if (pageId && pageId !== "new") {
        // Update existing page
        await pocketbase.collection("pages").update(pageId, pageData);
        console.log("Page updated successfully:", pageId);
      } else {
        // Create new page
        const newPage = await pocketbase.collection("pages").create(pageData);
        console.log("Page created successfully:", newPage);
        navigate(`/admin/pages/${newPage.id}/edit`, { replace: true });
      }

      // Show success message
      alert("Page published successfully!");
    } catch (error) {
      console.error("Error saving page:", error);
      const errorMessage = error instanceof Error ? error.message : "Please try again.";
      alert(`Error saving page: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={data}
        onPublish={handlePublish}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/pages")}
                disabled={saving}
              >
                Back to Pages
              </Button>
              {children}
            </>
          ),
        }}
        headerTitle={data.root?.title || "Page Editor"}
      />
    </div>
  );
}
