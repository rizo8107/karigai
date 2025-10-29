import { useState, useEffect } from "react";
import { Render } from "@measured/puck";
import "@measured/puck/puck.css";
import { puckConfig } from "@/puck/config";
import { pocketbase } from "@/lib/pocketbase";

interface PuckSectionProps {
  sectionId: string; // ID of a Puck page/section to embed
  fallback?: React.ReactNode; // Fallback content if section not found
}

export function PuckSection({ sectionId, fallback }: PuckSectionProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSection = async () => {
      try {
        const section = await pocketbase
          .collection("pages")
          .getOne(sectionId);
        
        setData(section.data);
      } catch (error) {
        console.error("Error loading Puck section:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadSection();
  }, [sectionId]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded" />;
  }

  if (!data) {
    return fallback || null;
  }

  return <Render config={puckConfig} data={data} />;
}

// Usage example in your existing pages:
export function ExampleUsage() {
  return (
    <div>
      {/* Your existing page content */}
      <h1>My Existing Page</h1>
      
      {/* Embed a Puck-built section */}
      <PuckSection 
        sectionId="your-section-id" 
        fallback={<div>Loading custom section...</div>}
      />
      
      {/* More existing content */}
      <p>Rest of your page...</p>
    </div>
  );
}
