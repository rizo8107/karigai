import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pocketbase } from "@/lib/pocketbase";
import { Edit, Eye, Trash2, Plus } from "lucide-react";

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  created: string;
  updated: string;
  published?: boolean;
  content_json?: any;
}

function extractThumbnailFromPageData(raw: any): string | undefined {
  try {
    let data = raw;
    if (typeof data === "string") data = JSON.parse(data);
    // 1) Explicit thumbnail on root
    const rootThumb = data?.root?.thumbnail;
    if (rootThumb) return rootThumb;
    // 2) First Image block
    if (Array.isArray(data?.content)) {
      const imgBlock = data.content.find((c: any) => c?.type === "Image" && c?.props?.src);
      if (imgBlock?.props?.src) return imgBlock.props.src;
    }
    // 3) Look for common background image props (e.g., Hero)
    if (Array.isArray(data?.content)) {
      for (const c of data.content) {
        const p = c?.props || {};
        const bg = p.backgroundImageDesktop || p.backgroundImageTablet || p.backgroundImageMobile || p.backgroundImage;
        if (bg) return bg;
        if (Array.isArray(p.slides)) {
          for (const s of p.slides) {
            const sbg = s.backgroundImageDesktop || s.backgroundImageTablet || s.backgroundImageMobile || s.backgroundImage;
            if (sbg) return sbg;
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return undefined;
}

export default function PagesManager() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const DEFAULT_PUCK_PAGES = [
    { title: "Home", slug: "home" },
    { title: "About", slug: "about" },
  ];

  useEffect(() => {
    (async () => {
      await ensureDefaultPages();
      await loadPages();
    })();
  }, []);

  const ensureDefaultPages = async () => {
    try {
      for (const def of DEFAULT_PUCK_PAGES) {
        try {
          await pocketbase.collection("pages").getFirstListItem(`slug="${def.slug}"`);
        } catch {
          await pocketbase.collection("pages").create({
            title: def.title,
            slug: def.slug,
            content_json: JSON.stringify({ content: [], root: { title: def.title } }),
            published: false,
            status: "draft",
          });
        }
      }
    } catch (e) {
      console.error("Error ensuring default pages:", e);
    }
  };

  const loadPages = async () => {
    try {
      setLoading(true);
      const result = await pocketbase
        .collection("pages")
        .getList(1, 50, {
          sort: "-updated",
        });
      
      setPages(result.items as unknown as Page[]);
    } catch (error) {
      console.error("Error loading pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) {
      return;
    }

    try {
      await pocketbase.collection("pages").delete(id);
      setPages(pages.filter(page => page.id !== id));
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Error deleting page. Please try again.");
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

  const handleTitleChange = (title: string) => {
    setNewPageTitle(title);
    // Auto-generate slug from title
    setNewPageSlug(generateSlug(title));
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim()) {
      alert("Please enter a page title");
      return;
    }

    if (!newPageSlug.trim()) {
      alert("Please enter a page slug");
      return;
    }

    try {
      setCreating(true);

      // Create page in PocketBase
      const newPage = await pocketbase.collection("pages").create({
        title: newPageTitle,
        slug: newPageSlug,
        content_json: JSON.stringify({ content: [], root: { title: newPageTitle } }),
        published: false,
        status: "draft",
      });

      // Navigate to editor
      navigate(`/admin/pages/${newPage.id}/edit`);
    } catch (error) {
      console.error("Error creating page:", error);
      alert("Error creating page. Please try again.");
      setCreating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading pages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pages Manager</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your website pages with the visual editor
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/themes">Theme Settings</Link>
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>
      </div>

      {pages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first page to get started
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Page
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <CardContent className="p-0">
                <div className="aspect-video w-full bg-muted overflow-hidden rounded-t-lg">
                  {(() => {
                    try {
                      const src = extractThumbnailFromPageData(page.content_json) ||
                        'https://via.placeholder.com/800x450?text=No+Thumbnail';
                      return (
                        <img src={src} alt={page.title} className="w-full h-full object-cover" />
                      );
                    } catch {
                      return (
                        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No thumbnail</div>
                      );
                    }
                  })()}
                </div>
              </CardContent>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">
                    {page.title}
                  </CardTitle>
                  <Badge
                    variant={page.status === "published" ? "default" : "secondary"}
                  >
                    {page.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  /{page.slug}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>Created: {formatDate(page.created)}</p>
                    <p>Updated: {formatDate(page.updated)}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/admin/pages/${page.id}/edit`}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    
                    {page.status === "published" && (
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/page/${page.slug}`} target="_blank">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deletePage(page.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Page Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>
              Enter a name and slug for your new page. The slug will be used in the URL.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                placeholder="e.g., About Us"
                value={newPageTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                disabled={creating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Page Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">/page/</span>
                <Input
                  id="slug"
                  placeholder="e.g., about-us"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  disabled={creating}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                URL: {window.location.origin}/page/{newPageSlug || "your-slug"}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false);
                setNewPageTitle("");
                setNewPageSlug("");
              }}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePage} disabled={creating}>
              {creating ? "Creating..." : "Create & Edit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
