import { useState, useEffect } from "react";
import { Render } from "@measured/puck";
import { puckConfig } from "@/puck/config";
import { pocketbase } from "@/lib/pocketbase";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

// Your existing page components
import YourExistingHero from "@/components/Hero"; // Replace with actual path
import YourExistingProductGrid from "@/components/ProductGrid"; // Replace with actual path

export default function EditableHomePage() {
  const [puckData, setPuckData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Add your admin check logic

  useEffect(() => {
    loadPageData();
    checkAdminStatus();
  }, []);

  const loadPageData = async () => {
    try {
      // Try to load Puck data for this page
      const page = await pocketbase
        .collection("pages")
        .getFirstListItem('slug="home"');
      
      setPuckData(page.data);
    } catch (error) {
      // If no Puck data exists, use default/existing content
      console.log("No Puck data found, using default content");
      setPuckData(null);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = () => {
    // Add your admin check logic here
    // For example: check if user has admin role
    setIsAdmin(true); // Replace with actual admin check
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative">
      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50">
          <Button asChild>
            <Link to="/admin/pages/home/edit">
              <Edit className="w-4 h-4 mr-2" />
              Edit Page
            </Link>
          </Button>
        </div>
      )}

      {/* Render Puck content if available, otherwise show existing content */}
      {puckData ? (
        <Render config={puckConfig} data={puckData} />
      ) : (
        <div>
          {/* Your existing page content */}
          <YourExistingHero />
          <YourExistingProductGrid />
          {/* Add more existing components */}
        </div>
      )}
    </div>
  );
}
