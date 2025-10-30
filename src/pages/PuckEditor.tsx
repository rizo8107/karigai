import { useState, useEffect } from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import "@/styles/puck-block.css";
import { completePuckConfig as puckConfig } from "@/puck/config/complete";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { pocketbase } from "@/lib/pocketbase";
import TemplateDialog from "@/components/TemplateDialog";
import { Layout } from "lucide-react";

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
  const [pageMeta, setPageMeta] = useState<{ slug?: string; published?: boolean }>({});
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [puckKey, setPuckKey] = useState(0);

  useEffect(() => {
    loadPageData();
  }, [pageId]);

  // UI Enhancements: sidebar collapse, search, and settings delete button
  useEffect(() => {
    // Defer to allow Puck to render DOM
    const t = setTimeout(() => {
      try {
        // 1) Collapse component categories by default and make them accordion-style
        const applyAccordion = (root: ParentNode) => {
          const details = Array.from(root.querySelectorAll<HTMLElement>('details')) as HTMLDetailsElement[];
          if (!details.length) return;
          details.forEach((d) => {
            // close by default
            d.open = false;
            // avoid multiple listeners
            (d as any)._puckAccordionBound || d.addEventListener('toggle', () => {
              if (d.open) {
                details.forEach((other) => {
                  if (other !== d) other.open = false;
                });
              }
            });
            (d as any)._puckAccordionBound = true;
          });
        };

        // 2) Insert a component search box at top of the Components panel
        const componentsPanel = document.querySelector<HTMLElement>('aside');
        if (componentsPanel) {
          // Apply collapsed-by-default + accordion now and on future updates
          const forceClose = () => {
            // Click any header that is currently expanded
            const expanded = componentsPanel.querySelectorAll<HTMLElement>('[aria-expanded="true"], details[open]');
            expanded.forEach((el) => {
              // try click the header/summary to toggle closed
              if (el.tagName.toLowerCase() === 'details') {
                (el as HTMLDetailsElement).open = false;
              } else {
                el.click();
              }
            });
          };

          applyAccordion(componentsPanel);
          forceClose();
          const mo = new MutationObserver(() => {
            applyAccordion(componentsPanel);
            forceClose();
          });
          mo.observe(componentsPanel, { childList: true, subtree: true });

          if (!componentsPanel.querySelector('#puck-component-search')) {
          const searchWrap = document.createElement('div');
          searchWrap.style.padding = '8px 12px';
          const input = document.createElement('input');
          input.type = 'text';
          input.id = 'puck-component-search';
          input.placeholder = 'Search components…';
          input.style.width = '100%';
          input.style.border = '1px solid #e5e7eb';
          input.style.borderRadius = '6px';
          input.style.padding = '6px 10px';
          input.style.fontSize = '14px';
          searchWrap.appendChild(input);
          componentsPanel.insertBefore(searchWrap, componentsPanel.firstChild);

          const filterButtons = () => {
            const q = input.value.toLowerCase().trim();
            const buttons = componentsPanel.querySelectorAll<HTMLButtonElement>('button');
            buttons.forEach((btn) => {
              const label = (btn.textContent || '').toLowerCase();
              const isCategory = btn.getAttribute('aria-controls') || btn.getAttribute('aria-expanded');
              if (isCategory) return; // don't hide category headers
              if (!q) {
                btn.style.display = '';
              } else {
                btn.style.display = label.includes(q) ? '' : 'none';
              }
            });
          };
          input.addEventListener('input', filterButtons);
          }
        }

        // 3) Add a Delete button in the settings panel to remove the selected block
        const settingsPanel = document.querySelector<HTMLElement>('[data-puck-settings-panel], aside ~ div');
        if (settingsPanel && !settingsPanel.querySelector('#puck-delete-block')) {
          const btn = document.createElement('button');
          btn.id = 'puck-delete-block';
          btn.textContent = 'Delete this block';
          Object.assign(btn.style, {
            width: '100%',
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ef4444',
            color: '#ef4444',
            background: 'transparent',
            cursor: 'pointer',
          } as CSSStyleDeclaration);
          btn.addEventListener('click', () => {
            // Try to click the built-in delete icon on the currently selected block toolbar
            const toolbarDelete = document.querySelector<HTMLElement>('[aria-label="Delete"], [title="Delete"], .puck-toolbar button[aria-label="Delete"]');
            if (toolbarDelete) {
              toolbarDelete.click();
            } else {
              alert('Select a block to delete.');
            }
          });
          settingsPanel.appendChild(btn);
        }
      } catch {
        // no-op safe guard
      }
    }, 50);
    return () => clearTimeout(t);
  }, [data]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      
      if (pageId && pageId !== "new") {
        // Load existing page
        const page = await pocketbase.collection("pages").getOne(pageId);
        setPageMeta({ slug: page.slug, published: !!page.published });
        
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
        setPageMeta({});
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
      setPageMeta({ slug: pageData.slug, published: true });
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

  const handleTemplateSelect = (template: any) => {
    // Insert template content into current page data
    if (template.data?.content) {
      const newContent = template.data.content.map((item: any, index: number) => ({
        type: item.type,
        props: {
          ...item.props,
          id: `${item.type}-${Date.now()}-${index}`,
        },
      }));
      
      setData((prevData) => {
        const updated = {
          ...prevData,
          content: [...prevData.content, ...newContent],
        };
        console.log('Template inserted:', template.name);
        console.log('Previous content:', prevData.content);
        console.log('New content:', updated.content);
        return updated;
      });
      
      // Force Puck to remount with new data
      setTimeout(() => {
        setPuckKey((prev) => prev + 1);
      }, 100);
      
      // Show success notification
      setTimeout(() => {
        alert(`✅ Template "${template.name}" inserted! ${newContent.length} components added to your page.`);
      }, 200);
    }
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
        key={puckKey}
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
              <Button
                variant="outline"
                onClick={() => setShowTemplateDialog(true)}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Layout size={16} />
                Templates
              </Button>
              {pageMeta.slug ? (
                <Button
                  variant="secondary"
                  onClick={() => window.open(`/page/${pageMeta.slug}`, "_blank", "noopener,noreferrer")}
                  disabled={!pageMeta.published || saving}
                >
                  View Page
                </Button>
              ) : null}
              {children}
            </>
          ),
        }}
        headerTitle={data.root?.title || "Page Editor"}
      />
      {showTemplateDialog && (
        <TemplateDialog
          onClose={() => setShowTemplateDialog(false)}
          onSelect={handleTemplateSelect}
        />
      )}
    </div>
  );
}
