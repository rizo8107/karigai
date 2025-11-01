import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { pluginRegistry } from "@/plugins/registry";
import { usePlugins } from "@/plugins/Provider";
import { savePluginConfig, togglePlugin } from "@/plugins/service";
import type { 
  PluginKey, 
  WhatsAppPluginConfig, 
  VideoPluginConfig, 
  PopupBannerConfig,
  GoogleAnalyticsConfig,
  GoogleTagManagerConfig,
  FacebookPixelConfig,
  MicrosoftClarityConfig,
  CustomScriptsConfig,
  CustomScript
} from "@/plugins/types";
import { getContentItems, uploadVideo, getContentVideoUrl, type ContentItem, getContentImageUrl, uploadImage } from "@/lib/content-service";
import { pocketbase } from "@/lib/pocketbase";
import { ProductImage } from "@/components/ProductImage";
import { Search, X } from "lucide-react";

export default function PluginsManager() {
  const { enabled, configs, loading, reload } = usePlugins();

  const [waConfig, setWaConfig] = useState<WhatsAppPluginConfig | null>(null);
  const [vidConfig, setVidConfig] = useState<VideoPluginConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [videoPickerOpen, setVideoPickerOpen] = useState(false);
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [popupConfig, setPopupConfig] = useState<PopupBannerConfig | null>(null);
  const [gaConfig, setGaConfig] = useState<GoogleAnalyticsConfig | null>(null);
  const [gtmConfig, setGtmConfig] = useState<GoogleTagManagerConfig | null>(null);
  const [fbConfig, setFbConfig] = useState<FacebookPixelConfig | null>(null);
  const [clarityConfig, setClarityConfig] = useState<MicrosoftClarityConfig | null>(null);
  const [customScriptsConfig, setCustomScriptsConfig] = useState<CustomScriptsConfig | null>(null);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [images, setImages] = useState<ContentItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selected, setSelected] = useState<PluginKey>("whatsapp_floating");
  const [productPickerOpen, setProductPickerOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [selectedProductForVideo, setSelectedProductForVideo] = useState<{index: number, type: 'main' | 'path'} | null>(null);
  const [selectedVideoField, setSelectedVideoField] = useState<{type: 'main' | 'product' | 'path', index?: number} | null>(null);

  useEffect(() => {
    if (!loading) {
      setWaConfig(configs.whatsapp_floating as WhatsAppPluginConfig);
      setVidConfig(configs.video_floating as VideoPluginConfig);
      setPopupConfig(configs.popup_banner as PopupBannerConfig);
      setGaConfig(configs.google_analytics as GoogleAnalyticsConfig);
      setGtmConfig(configs.google_tag_manager as GoogleTagManagerConfig);
      setFbConfig(configs.facebook_pixel as FacebookPixelConfig);
      setClarityConfig(configs.microsoft_clarity as MicrosoftClarityConfig);
      
      const customScripts = configs.custom_scripts as CustomScriptsConfig;
      console.log('[PluginsManager] Loading custom scripts config:', customScripts);
      setCustomScriptsConfig(customScripts);
    }
  }, [configs, loading]);

  const onToggle = async (key: PluginKey, value: boolean) => {
    await togglePlugin(key, value);
    await reload();
  };

  const onSave = async (key: PluginKey) => {
    try {
      setSaving(true);
      if (key === "whatsapp_floating" && waConfig) {
        await savePluginConfig(key, waConfig);
      }
      if (key === "video_floating" && vidConfig) {
        await savePluginConfig(key, vidConfig);
      }
      if (key === "popup_banner" && popupConfig) {
        await savePluginConfig(key, popupConfig);
      }
      if (key === "google_analytics" && gaConfig) {
        await savePluginConfig(key, gaConfig);
      }
      if (key === "google_tag_manager" && gtmConfig) {
        await savePluginConfig(key, gtmConfig);
      }
      if (key === "facebook_pixel" && fbConfig) {
        await savePluginConfig(key, fbConfig);
      }
      if (key === "microsoft_clarity" && clarityConfig) {
        await savePluginConfig(key, clarityConfig);
      }
      if (key === "custom_scripts" && customScriptsConfig) {
        await savePluginConfig(key, customScriptsConfig);
      }
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = (key: PluginKey) => {
    if (key === "whatsapp_floating") setWaConfig(pluginRegistry.whatsapp_floating.defaultConfig);
    if (key === "video_floating") setVidConfig(pluginRegistry.video_floating.defaultConfig);
    if (key === "popup_banner") setPopupConfig(pluginRegistry.popup_banner.defaultConfig);
    if (key === "google_analytics") setGaConfig(pluginRegistry.google_analytics.defaultConfig);
    if (key === "google_tag_manager") setGtmConfig(pluginRegistry.google_tag_manager.defaultConfig);
    if (key === "facebook_pixel") setFbConfig(pluginRegistry.facebook_pixel.defaultConfig);
    if (key === "microsoft_clarity") setClarityConfig(pluginRegistry.microsoft_clarity.defaultConfig);
    if (key === "custom_scripts") setCustomScriptsConfig(pluginRegistry.custom_scripts.defaultConfig);
  };

  const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);

  const loadVideos = async () => {
    try {
      setLoadingVideos(true);
      const items = await getContentItems();
      const onlyVideos = items.filter((it) => Boolean(it.Videos));
      setVideos(onlyVideos);
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleUploadVideo = async (file: File) => {
    const created = await uploadVideo(file);
    if (created) {
      // Reload list and prefill selected URL
      await loadVideos();
      const url = getContentVideoUrl(created);
      
      if (selectedVideoField?.type === 'main') {
        // Update main video URL
        if (vidConfig) setVidConfig({ ...vidConfig, videoUrl: url });
      } else if (selectedVideoField?.type === 'product' && selectedVideoField.index !== undefined) {
        // Update product-specific video URL
        if (vidConfig) {
          const updated = [...(vidConfig.productVideos || [])];
          updated[selectedVideoField.index] = { ...updated[selectedVideoField.index], videoUrl: url };
          setVidConfig({ ...vidConfig, productVideos: updated });
        }
      } else if (selectedVideoField?.type === 'path' && selectedVideoField.index !== undefined) {
        // Update path-specific video URL
        if (vidConfig) {
          const updated = [...(vidConfig.pathConfigs || [])];
          updated[selectedVideoField.index] = { ...updated[selectedVideoField.index], videoUrl: url };
          setVidConfig({ ...vidConfig, pathConfigs: updated });
        }
      }
    }
  };

  const loadImages = async () => {
    try {
      setLoadingImages(true);
      const items = await getContentItems();
      const onlyImages = items.filter((it) => Boolean(it.Images));
      setImages(onlyImages);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleUploadImage = async (file: File) => {
    const created = await uploadImage(file);
    if (created) {
      await loadImages();
      const url = getContentImageUrl(created);
      if (popupConfig) setPopupConfig({ ...popupConfig, imageUrl: url });
    }
  };

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      
      // Wait a bit for PocketBase auth to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('PocketBase auth state:', {
        isAdmin: pocketbase.authStore.isAdmin,
        isValid: pocketbase.authStore.isValid,
        token: pocketbase.authStore.token ? 'present' : 'missing'
      });
      
      // Try multiple approaches to fetch products
      let records;
      
      try {
        // First attempt: simple getList like ecommerce.tsx
        records = await pocketbase.collection('products').getList(1, 50, {
          sort: '-created'
        });
        console.log('Products loaded successfully:', records.items.length);
      } catch (firstError) {
        console.warn('First attempt failed:', firstError);
        
        try {
          // Second attempt: without sort parameter
          records = await pocketbase.collection('products').getList(1, 50);
          console.log('Products loaded without sort:', records.items.length);
        } catch (secondError) {
          console.warn('Second attempt failed:', secondError);
          
          try {
            // Third attempt: smaller page size
            records = await pocketbase.collection('products').getList(1, 10);
            console.log('Products loaded with smaller page:', records.items.length);
          } catch (thirdError) {
            console.warn('Third attempt failed:', thirdError);
            
            // Fourth attempt: try getFullList
            const fullList = await pocketbase.collection('products').getFullList();
            records = { items: fullList.slice(0, 50) };
            console.log('Products loaded via getFullList:', fullList.length);
          }
        }
      }
      
      setProducts(records.items || records || []);
    } catch (error) {
      console.error('All product loading attempts failed:', error);
      console.error('Error details:', {
        message: (error as any)?.message || 'Unknown error',
        status: (error as any)?.status || 'Unknown status',
        data: (error as any)?.data || 'No data'
      });
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleProductSelect = (product: any) => {
    if (!selectedProductForVideo || !vidConfig) return;
    
    const { index, type } = selectedProductForVideo;
    
    if (type === 'main') {
      // Update main product videos array
      const updated = [...(vidConfig.productVideos || [])];
      updated[index] = { ...updated[index], productId: product.id };
      setVidConfig({ ...vidConfig, productVideos: updated });
    }
    
    setProductPickerOpen(false);
    setSelectedProductForVideo(null);
    setProductSearch("");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Plugin Manager</h1>
        <p className="text-muted-foreground mt-2">Enable and configure global floating plugins.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <div className="rounded-md border bg-card">
            <div className="p-3 border-b text-sm font-medium">Plugins</div>
            <nav className="p-2 space-y-1">
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'whatsapp_floating' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('whatsapp_floating')}
                title="WhatsApp Floating settings"
              >
                <span>WhatsApp Floating</span>
                <Switch checked={enabled.whatsapp_floating} onCheckedChange={(v) => onToggle('whatsapp_floating', v)} />
              </button>
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'video_floating' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('video_floating')}
                title="Video Floating settings"
              >
                <span>Video Floating</span>
                <Switch checked={enabled.video_floating} onCheckedChange={(v) => onToggle('video_floating', v)} />
              </button>
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'popup_banner' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('popup_banner')}
                title="Popup Banner settings"
              >
                <span>Popup Banner</span>
                <Switch checked={enabled.popup_banner} onCheckedChange={(v) => onToggle('popup_banner', v)} />
              </button>
              
              {/* Analytics Plugins */}
              <div className="pt-2 mt-2 border-t">
                <div className="px-3 py-1 text-xs font-medium text-muted-foreground">Analytics</div>
              </div>
              
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'google_analytics' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('google_analytics')}
                title="Google Analytics (GA4) settings"
              >
                <span>Google Analytics</span>
                <Switch checked={enabled.google_analytics} onCheckedChange={(v) => onToggle('google_analytics', v)} />
              </button>
              
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'google_tag_manager' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('google_tag_manager')}
                title="Google Tag Manager settings"
              >
                <span>Google Tag Manager</span>
                <Switch checked={enabled.google_tag_manager} onCheckedChange={(v) => onToggle('google_tag_manager', v)} />
              </button>
              
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'facebook_pixel' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('facebook_pixel')}
                title="Facebook Pixel settings"
              >
                <span>Facebook Pixel</span>
                <Switch checked={enabled.facebook_pixel} onCheckedChange={(v) => onToggle('facebook_pixel', v)} />
              </button>
              
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'microsoft_clarity' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('microsoft_clarity')}
                title="Microsoft Clarity settings"
              >
                <span>Microsoft Clarity</span>
                <Switch checked={enabled.microsoft_clarity} onCheckedChange={(v) => onToggle('microsoft_clarity', v)} />
              </button>
              
              {/* Custom Scripts */}
              <div className="pt-2 mt-2 border-t">
                <div className="px-3 py-1 text-xs font-medium text-muted-foreground">Custom</div>
              </div>
              
              <button
                type="button"
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent ${selected === 'custom_scripts' ? 'bg-accent' : ''}`}
                onClick={() => setSelected('custom_scripts')}
                title="Custom Scripts settings"
              >
                <span>Custom Scripts</span>
                <Switch checked={enabled.custom_scripts} onCheckedChange={(v) => onToggle('custom_scripts', v)} />
              </button>
            </nav>
          </div>
        </aside>

        {/* Details panel */}
        <section className="flex-1 space-y-6">
        {selected === 'whatsapp_floating' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>WhatsApp Floating Button</CardTitle>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Enabled</Label>
              <Switch
                checked={enabled.whatsapp_floating}
                onCheckedChange={(v) => onToggle("whatsapp_floating", v)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {waConfig && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="wa-phone">Phone Number (without +)</Label>
                  <Input
                    id="wa-phone"
                    value={waConfig.phoneNumber}
                    onChange={(e) => setWaConfig({ ...waConfig, phoneNumber: e.target.value })}
                    placeholder="919999999999"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-msg">Default Message</Label>
                  <Input
                    id="wa-msg"
                    value={waConfig.message || ""}
                    onChange={(e) => setWaConfig({ ...waConfig, message: e.target.value })}
                    placeholder="Hello! I need help."
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={waConfig.position === "bottom-right" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, position: "bottom-right" })}
                    >
                      Bottom Right
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.position === "bottom-left" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, position: "bottom-left" })}
                    >
                      Bottom Left
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.position === "top-right" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, position: "top-right" })}
                    >
                      Top Right
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.position === "top-left" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, position: "top-left" })}
                    >
                      Top Left
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={waConfig.showClose !== false}
                      onCheckedChange={(v) => setWaConfig({ ...waConfig, showClose: v })}
                    />
                    <Label>Show Close</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="wa-offx">Offset X (px)</Label>
                      <Input
                        id="wa-offx"
                        type="number"
                        value={waConfig.offsetX ?? 16}
                        onChange={(e) => setWaConfig({ ...waConfig, offsetX: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="wa-offy">Offset Y (px)</Label>
                      <Input
                        id="wa-offy"
                        type="number"
                        value={waConfig.offsetY ?? 16}
                        onChange={(e) => setWaConfig({ ...waConfig, offsetY: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-scale">Size (scale 0.5 - 2)</Label>
                  <Input
                    id="wa-scale"
                    type="number"
                    step={0.1}
                    min={0.5}
                    max={2}
                    value={waConfig.scale ?? 1}
                    onChange={(e) => setWaConfig({ ...waConfig, scale: Number(e.target.value) })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={waConfig.showRing !== false}
                      onCheckedChange={(v) => setWaConfig({ ...waConfig, showRing: v })}
                    />
                    <Label>Show Ring</Label>
                  </div>
                  {waConfig.showRing !== false && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="wa-ring-color">Ring Color</Label>
                        <Input
                          id="wa-ring-color"
                          value={waConfig.ringColor || ""}
                          onChange={(e) => setWaConfig({ ...waConfig, ringColor: e.target.value })}
                          placeholder="#ffffff"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="wa-ring-width">Ring Width (px)</Label>
                        <Input
                          id="wa-ring-width"
                          type="number"
                          value={waConfig.ringWidth ?? 2}
                          onChange={(e) => setWaConfig({ ...waConfig, ringWidth: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-btn">Button Color</Label>
                  <Input
                    id="wa-btn"
                    value={waConfig.buttonColor || ""}
                    onChange={(e) => setWaConfig({ ...waConfig, buttonColor: e.target.value })}
                    placeholder="#25D366"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-text">Text Color</Label>
                  <Input
                    id="wa-text"
                    value={waConfig.textColor || ""}
                    onChange={(e) => setWaConfig({ ...waConfig, textColor: e.target.value })}
                    placeholder="#ffffff"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-icon">Icon Color</Label>
                  <Input
                    id="wa-icon"
                    value={waConfig.iconColor || ""}
                    onChange={(e) => setWaConfig({ ...waConfig, iconColor: e.target.value })}
                    placeholder="#ffffff"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-label">Label</Label>
                  <Input
                    id="wa-label"
                    value={waConfig.label || ""}
                    onChange={(e) => setWaConfig({ ...waConfig, label: e.target.value })}
                    placeholder="Chat on WhatsApp"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={waConfig.showLabel !== false}
                      onCheckedChange={(v) => setWaConfig({ ...waConfig, showLabel: v })}
                    />
                    <Label>Show Label</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={waConfig.showOnMobile !== false}
                      onCheckedChange={(v) => setWaConfig({ ...waConfig, showOnMobile: v })}
                    />
                    <Label>Show on Mobile</Label>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="wa-z">Z-Index</Label>
                  <Input
                    id="wa-z"
                    type="number"
                    value={waConfig.zIndex ?? 60}
                    onChange={(e) => setWaConfig({ ...waConfig, zIndex: Number(e.target.value) })}
                  />
                </div>
                {/* Visibility */}
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={waConfig.visibility?.mode === "all" || !waConfig.visibility ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, visibility: { mode: "all", include: [], exclude: [] } })}
                    >
                      All pages
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.visibility?.mode === "homepage" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, visibility: { mode: "homepage", include: [], exclude: [] } })}
                    >
                      Homepage only
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.visibility?.mode === "include" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, visibility: { mode: "include", include: ["/"], exclude: [] } })}
                    >
                      Include paths
                    </Button>
                    <Button
                      type="button"
                      variant={waConfig.visibility?.mode === "exclude" ? "default" : "outline"}
                      onClick={() => setWaConfig({ ...waConfig, visibility: { mode: "exclude", include: [], exclude: ["/checkout"] } })}
                    >
                      Exclude paths
                    </Button>
                  </div>
                  {(waConfig.visibility?.mode === "include") && (
                    <div className="grid gap-2">
                      <Label>Include these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea
                        value={(waConfig.visibility?.include || []).join("\n")}
                        onChange={(e) => setWaConfig({ ...waConfig, visibility: { mode: "include", include: e.target.value.split("\n").map(s => s.trim()).filter(Boolean), exclude: [] } })}
                        placeholder={"/\n/shop\n/product/*"}
                      />
                    </div>
                  )}
                  {(waConfig.visibility?.mode === "exclude") && (
                    <div className="grid gap-2">
                      <Label>Exclude these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea
                        value={(waConfig.visibility?.exclude || []).join("\n")}
                        onChange={(e) => setWaConfig({ ...waConfig, visibility: { mode: "exclude", include: [], exclude: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) } })}
                        placeholder={"/checkout\n/cart"}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onSave("whatsapp_floating")} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => resetToDefault("whatsapp_floating")}>Reset</Button>
                  <a
                    href={`https://wa.me/${waConfig.phoneNumber}?text=${encodeURIComponent(waConfig.message || "Hello!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline ml-auto"
                    title="Preview link"
                  >
                    Preview link
                  </a>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        )}

        {selected === 'video_floating' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Video Floating</CardTitle>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Enabled</Label>
              <Switch
                checked={enabled.video_floating}
                onCheckedChange={(v) => onToggle("video_floating", v)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {vidConfig && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="vid-url">Video URL (YouTube embed or MP4)</Label>
                  <Input
                    id="vid-url"
                    value={vidConfig.videoUrl}
                    onChange={(e) => setVidConfig({ ...vidConfig, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/... or https://.../video.mp4"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => { 
                        setSelectedVideoField({ type: 'main' });
                        setVideoPickerOpen(true); 
                        await loadVideos(); 
                      }}
                    >
                      Select / Upload from Content
                    </Button>
                    {vidConfig.videoUrl && (
                      <a href={vidConfig.videoUrl} className="text-sm underline" target="_blank" rel="noreferrer">
                        Open video
                      </a>
                    )}
                  </div>
                </div>
                {/* Preview */}
                {vidConfig.videoUrl && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    {/youtube|youtu\.be/.test(vidConfig.videoUrl) ? (
                      <iframe
                        width={360}
                        height={202}
                        src={vidConfig.videoUrl}
                        title="Video preview"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md border"
                      />
                    ) : (
                      <video
                        width={360}
                        height={202}
                        src={vidConfig.videoUrl}
                        controls
                        className="rounded-md border"
                      />
                    )}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={vidConfig.position === "bottom-right" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, position: "bottom-right" })}
                    >
                      Bottom Right
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.position === "bottom-left" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, position: "bottom-left" })}
                    >
                      Bottom Left
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.position === "top-right" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, position: "top-right" })}
                    >
                      Top Right
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.position === "top-left" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, position: "top-left" })}
                    >
                      Top Left
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vidConfig.showClose !== false}
                      onCheckedChange={(v) => setVidConfig({ ...vidConfig, showClose: v })}
                    />
                    <Label>Show Close</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="vid-offx">Offset X (px)</Label>
                      <Input
                        id="vid-offx"
                        type="number"
                        value={vidConfig.offsetX ?? 16}
                        onChange={(e) => setVidConfig({ ...vidConfig, offsetX: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="vid-offy">Offset Y (px)</Label>
                      <Input
                        id="vid-offy"
                        type="number"
                        value={vidConfig.offsetY ?? 16}
                        onChange={(e) => setVidConfig({ ...vidConfig, offsetY: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vidConfig.autoPlay === true}
                      onCheckedChange={(v) => setVidConfig({ ...vidConfig, autoPlay: v })}
                    />
                    <Label>Auto play</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vidConfig.muted !== false}
                      onCheckedChange={(v) => setVidConfig({ ...vidConfig, muted: v })}
                    />
                    <Label>Muted</Label>
                  </div>
                </div>
                {/* Responsive Sizing */}
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-base font-semibold">Responsive Sizing</Label>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Desktop</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="vid-desktop-w">Width (px)</Label>
                          <Input
                            id="vid-desktop-w"
                            type="number"
                            value={vidConfig.desktop?.width ?? 320}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              desktop: { ...vidConfig.desktop, width: Number(e.target.value) }
                            })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="vid-desktop-h">Height (px)</Label>
                          <Input
                            id="vid-desktop-h"
                            type="number"
                            value={vidConfig.desktop?.height ?? 180}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              desktop: { ...vidConfig.desktop, height: Number(e.target.value) }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Mobile</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="vid-mobile-w">Width (px)</Label>
                          <Input
                            id="vid-mobile-w"
                            type="number"
                            value={vidConfig.mobile?.width ?? 280}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              mobile: { ...vidConfig.mobile, width: Number(e.target.value) }
                            })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="vid-mobile-h">Height (px)</Label>
                          <Input
                            id="vid-mobile-h"
                            type="number"
                            value={vidConfig.mobile?.height ?? 160}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              mobile: { ...vidConfig.mobile, height: Number(e.target.value) }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shop Now Button */}
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-base font-semibold">Shop Now Button</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vidConfig.shopNowButton?.enabled === true}
                      onCheckedChange={(v) => setVidConfig({ 
                        ...vidConfig, 
                        shopNowButton: { ...vidConfig.shopNowButton, enabled: v }
                      })}
                    />
                    <Label>Enable Shop Now overlay button</Label>
                  </div>
                  {vidConfig.shopNowButton?.enabled && (
                    <div className="space-y-3 pl-4 border-l-2 border-muted">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="shop-text">Button Text</Label>
                          <Input
                            id="shop-text"
                            value={vidConfig.shopNowButton?.text ?? "Shop Now"}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              shopNowButton: { ...vidConfig.shopNowButton, text: e.target.value }
                            })}
                            placeholder="Shop Now"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="shop-position">Position</Label>
                          <select
                            id="shop-position"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={vidConfig.shopNowButton?.position ?? "bottom-right"}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              shopNowButton: { ...vidConfig.shopNowButton, position: e.target.value as "bottom-left" | "bottom-right" | "bottom-center" }
                            })}
                            title="Button position on video"
                          >
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                            <option value="bottom-center">Bottom Center</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="shop-product">Product ID</Label>
                          <Input
                            id="shop-product"
                            value={vidConfig.shopNowButton?.productId ?? ""}
                            onChange={(e) => setVidConfig({ 
                              ...vidConfig, 
                              shopNowButton: { ...vidConfig.shopNowButton, productId: e.target.value }
                            })}
                            placeholder="product-123"
                          />
                        </div>
                        
                        {/* Color Pickers */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="shop-bg">Background Color</Label>
                            <div className="flex gap-2 items-center">
                              <input
                                id="shop-bg"
                                type="color"
                                value={vidConfig.shopNowButton?.backgroundColor ?? "#000000"}
                                onChange={(e) => setVidConfig({ 
                                  ...vidConfig, 
                                  shopNowButton: { ...vidConfig.shopNowButton, backgroundColor: e.target.value }
                                })}
                                className="w-12 h-10 rounded border border-input cursor-pointer"
                              />
                              <Input
                                value={vidConfig.shopNowButton?.backgroundColor ?? "#000000"}
                                onChange={(e) => setVidConfig({ 
                                  ...vidConfig, 
                                  shopNowButton: { ...vidConfig.shopNowButton, backgroundColor: e.target.value }
                                })}
                                placeholder="#000000"
                                className="flex-1 font-mono text-sm"
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="shop-text-color">Text Color</Label>
                            <div className="flex gap-2 items-center">
                              <input
                                id="shop-text-color"
                                type="color"
                                value={vidConfig.shopNowButton?.textColor ?? "#ffffff"}
                                onChange={(e) => setVidConfig({ 
                                  ...vidConfig, 
                                  shopNowButton: { ...vidConfig.shopNowButton, textColor: e.target.value }
                                })}
                                className="w-12 h-10 rounded border border-input cursor-pointer"
                              />
                              <Input
                                value={vidConfig.shopNowButton?.textColor ?? "#ffffff"}
                                onChange={(e) => setVidConfig({ 
                                  ...vidConfig, 
                                  shopNowButton: { ...vidConfig.shopNowButton, textColor: e.target.value }
                                })}
                                placeholder="#ffffff"
                                className="flex-1 font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Button Preview */}
                        <div className="grid gap-2">
                          <Label>Button Preview</Label>
                          <div className="p-4 bg-gray-100 rounded-md flex items-center justify-center">
                            <button
                              type="button"
                              className="px-3 py-1.5 text-sm font-medium rounded-md shadow-lg transition-all hover:scale-105"
                              style={{
                                backgroundColor: vidConfig.shopNowButton?.backgroundColor || "#000000",
                                color: vidConfig.shopNowButton?.textColor || "#ffffff"
                              }}
                              disabled
                            >
                              {vidConfig.shopNowButton?.text || "Shop Now"}
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            This is how the button will appear on your video
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="shop-url">Custom URL (optional)</Label>
                        <Input
                          id="shop-url"
                          value={vidConfig.shopNowButton?.url ?? ""}
                          onChange={(e) => setVidConfig({ 
                            ...vidConfig, 
                            shopNowButton: { ...vidConfig.shopNowButton, url: e.target.value }
                          })}
                          placeholder="https://example.com/offer"
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave empty to use Product ID, or provide a custom URL to override
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product-Specific Videos */}
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-base font-semibold">Product-Specific Videos</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure different videos for specific products. Videos will automatically show when users visit those product pages.
                  </p>
                  <div className="space-y-3">
                    {(vidConfig.productVideos || []).map((pv, index) => (
                      <div key={index} className="p-3 border rounded-md space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Product Video #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updated = [...(vidConfig.productVideos || [])];
                              updated.splice(index, 1);
                              setVidConfig({ ...vidConfig, productVideos: updated });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Product</Label>
                            <div className="flex gap-2">
                              <Input
                                value={pv.productId}
                                onChange={(e) => {
                                  const updated = [...(vidConfig.productVideos || [])];
                                  updated[index] = { ...pv, productId: e.target.value };
                                  setVidConfig({ ...vidConfig, productVideos: updated });
                                }}
                                placeholder="product-123"
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  setSelectedProductForVideo({ index, type: 'main' });
                                  setProductPickerOpen(true);
                                  await loadProducts();
                                }}
                              >
                                Browse
                              </Button>
                            </div>
                            {pv.productId && (
                              <div className="text-xs text-muted-foreground">
                                Selected: {products.find(p => p.id === pv.productId)?.name || pv.productId}
                              </div>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label>Video URL</Label>
                            <Input
                              value={pv.videoUrl}
                              onChange={(e) => {
                                const updated = [...(vidConfig.productVideos || [])];
                                updated[index] = { ...pv, videoUrl: e.target.value };
                                setVidConfig({ ...vidConfig, productVideos: updated });
                              }}
                              placeholder="https://youtube.com/embed/..."
                            />
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  setSelectedVideoField({ type: 'product', index });
                                  setVideoPickerOpen(true);
                                  await loadVideos();
                                }}
                              >
                                Select / Upload Video
                              </Button>
                              {pv.videoUrl && (
                                <a 
                                  href={pv.videoUrl} 
                                  className="text-sm underline" 
                                  target="_blank" 
                                  rel="noreferrer"
                                >
                                  Open video
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const updated = [...(vidConfig.productVideos || []), { productId: "", videoUrl: "" }];
                        setVidConfig({ ...vidConfig, productVideos: updated });
                      }}
                    >
                      Add Product Video
                    </Button>
                  </div>
                </div>
                
                {/* Path-Specific Configurations */}
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-base font-semibold">Path-Specific Videos</Label>
                  <p className="text-sm text-muted-foreground">
                    Configure different videos for different site sections. Use * for wildcards (e.g., /product/* for all product pages).
                  </p>
                  <div className="space-y-3">
                    {(vidConfig.pathConfigs || []).map((pc, index) => (
                      <div key={index} className="p-3 border rounded-md space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Path Config #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updated = [...(vidConfig.pathConfigs || [])];
                              updated.splice(index, 1);
                              setVidConfig({ ...vidConfig, pathConfigs: updated });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          <Label>Paths (one per line)</Label>
                          <Textarea
                            value={pc.paths.join("\n")}
                            onChange={(e) => {
                              const updated = [...(vidConfig.pathConfigs || [])];
                              updated[index] = { ...pc, paths: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) };
                              setVidConfig({ ...vidConfig, pathConfigs: updated });
                            }}
                            placeholder="/\n/shop\n/product/*"
                            rows={3}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Video URL for these paths</Label>
                          <Input
                            value={pc.videoUrl || ""}
                            onChange={(e) => {
                              const updated = [...(vidConfig.pathConfigs || [])];
                              updated[index] = { ...pc, videoUrl: e.target.value };
                              setVidConfig({ ...vidConfig, pathConfigs: updated });
                            }}
                            placeholder="https://youtube.com/embed/..."
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={async () => {
                                setSelectedVideoField({ type: 'path', index });
                                setVideoPickerOpen(true);
                                await loadVideos();
                              }}
                            >
                              Select / Upload Video
                            </Button>
                            {pc.videoUrl && (
                              <a 
                                href={pc.videoUrl} 
                                className="text-sm underline" 
                                target="_blank" 
                                rel="noreferrer"
                              >
                                Open video
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const updated = [...(vidConfig.pathConfigs || []), { paths: ["/"], videoUrl: "" }];
                        setVidConfig({ ...vidConfig, pathConfigs: updated });
                      }}
                    >
                      Add Path Configuration
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vid-z">Z-Index</Label>
                  <Input
                    id="vid-z"
                    type="number"
                    value={vidConfig.zIndex ?? 60}
                    onChange={(e) => setVidConfig({ ...vidConfig, zIndex: Number(e.target.value) })}
                  />
                </div>
                
                {/* Auto-close Settings */}
                <div className="space-y-4 border-t pt-4">
                  <Label className="text-base font-semibold">Auto-close Settings</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vidConfig.autoClose === true}
                      onCheckedChange={(v) => setVidConfig({ ...vidConfig, autoClose: v })}
                    />
                    <Label>Enable auto-close</Label>
                  </div>
                  {vidConfig.autoClose && (
                    <div className="grid gap-2">
                      <Label htmlFor="vid-autoclose-ms">Auto-close after (seconds)</Label>
                      <Input
                        id="vid-autoclose-ms"
                        type="number"
                        min="1"
                        max="300"
                        value={Math.ceil((vidConfig.autoCloseAfterMs ?? 10000) / 1000)}
                        onChange={(e) => setVidConfig({ 
                          ...vidConfig, 
                          autoCloseAfterMs: Number(e.target.value) * 1000 
                        })}
                        placeholder="10"
                      />
                      <p className="text-xs text-muted-foreground">
                        Video will automatically close after this many seconds. A countdown timer will be shown to users.
                      </p>
                    </div>
                  )}
                </div>
                {/* Visibility */}
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={vidConfig.visibility?.mode === "all" || !vidConfig.visibility ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, visibility: { mode: "all", include: [], exclude: [] } })}
                    >
                      All pages
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.visibility?.mode === "homepage" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, visibility: { mode: "homepage", include: [], exclude: [] } })}
                    >
                      Homepage only
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.visibility?.mode === "include" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, visibility: { mode: "include", include: ["/"], exclude: [] } })}
                    >
                      Include paths
                    </Button>
                    <Button
                      type="button"
                      variant={vidConfig.visibility?.mode === "exclude" ? "default" : "outline"}
                      onClick={() => setVidConfig({ ...vidConfig, visibility: { mode: "exclude", include: [], exclude: ["/checkout"] } })}
                    >
                      Exclude paths
                    </Button>
                  </div>
                  {(vidConfig.visibility?.mode === "include") && (
                    <div className="grid gap-2">
                      <Label>Include these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea
                        value={(vidConfig.visibility?.include || []).join("\n")}
                        onChange={(e) => setVidConfig({ ...vidConfig, visibility: { mode: "include", include: e.target.value.split("\n").map(s => s.trim()).filter(Boolean), exclude: [] } })}
                        placeholder={"/\n/shop\n/product/*"}
                      />
                    </div>
                  )}
                  {(vidConfig.visibility?.mode === "exclude") && (
                    <div className="grid gap-2">
                      <Label>Exclude these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea
                        value={(vidConfig.visibility?.exclude || []).join("\n")}
                        onChange={(e) => setVidConfig({ ...vidConfig, visibility: { mode: "exclude", include: [], exclude: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) } })}
                        placeholder={"/checkout\n/cart"}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onSave("video_floating")} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => resetToDefault("video_floating")}>Reset</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        )}
        {selected === 'popup_banner' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Popup Banner</CardTitle>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Enabled</Label>
              <Switch
                checked={enabled.popup_banner}
                onCheckedChange={(v) => onToggle("popup_banner", v)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {popupConfig && (
              <>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="pb-title">Title</Label>
                    <Input id="pb-title" value={popupConfig.title || ""} onChange={(e) => setPopupConfig({ ...popupConfig, title: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pb-sub">Subtitle</Label>
                    <Input id="pb-sub" value={popupConfig.subtitle || ""} onChange={(e) => setPopupConfig({ ...popupConfig, subtitle: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="pb-image">Image URL</Label>
                    <Input id="pb-image" value={popupConfig.imageUrl || ""} onChange={(e) => setPopupConfig({ ...popupConfig, imageUrl: e.target.value })} placeholder="https://..." />
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" onClick={async () => { setImagePickerOpen(true); await loadImages(); }}>Select / Upload from Content</Button>
                      {popupConfig.imageUrl && (
                        <a href={popupConfig.imageUrl} className="text-sm underline" target="_blank" rel="noreferrer">Open image</a>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pb-coupon">Coupon Code</Label>
                    <Input id="pb-coupon" value={popupConfig.couponCode || ""} onChange={(e) => setPopupConfig({ ...popupConfig, couponCode: e.target.value })} placeholder="WELCOME10" />
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="pb-cta">CTA Label</Label>
                    <Input id="pb-cta" value={popupConfig.ctaLabel || ""} onChange={(e) => setPopupConfig({ ...popupConfig, ctaLabel: e.target.value })} placeholder="Submit" />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <Switch checked={popupConfig.requirePhone !== false} onCheckedChange={(v) => setPopupConfig({ ...popupConfig, requirePhone: v })} />
                    <Label>Require Phone</Label>
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <Switch checked={popupConfig.showConsent !== false} onCheckedChange={(v) => setPopupConfig({ ...popupConfig, showConsent: v })} />
                    <Label>Show Consent</Label>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="pb-delay">Initial Delay (ms)</Label>
                    <Input id="pb-delay" type="number" value={popupConfig.initialDelayMs ?? 1200} onChange={(e) => setPopupConfig({ ...popupConfig, initialDelayMs: Number(e.target.value) })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Frequency</Label>
                    <div className="flex gap-2 flex-wrap">
                      <Button type="button" variant={popupConfig.frequency === "every" ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, frequency: "every" })}>Every load</Button>
                      <Button type="button" variant={popupConfig.frequency === "session" || !popupConfig.frequency ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, frequency: "session" })}>Per session</Button>
                      <Button type="button" variant={popupConfig.frequency === "days" ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, frequency: "days" })}>Every N days</Button>
                    </div>
                  </div>
                  {popupConfig.frequency === "days" && (
                    <div className="grid gap-2">
                      <Label htmlFor="pb-days">Days Interval</Label>
                      <Input id="pb-days" type="number" value={popupConfig.daysInterval ?? 7} onChange={(e) => setPopupConfig({ ...popupConfig, daysInterval: Number(e.target.value) })} />
                    </div>
                  )}
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Switch checked={popupConfig.showOnMobile !== false} onCheckedChange={(v) => setPopupConfig({ ...popupConfig, showOnMobile: v })} />
                    <Label>Show on Mobile</Label>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pb-width">Max Width (px)</Label>
                    <Input id="pb-width" type="number" value={popupConfig.width ?? 880} onChange={(e) => setPopupConfig({ ...popupConfig, width: Number(e.target.value) })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={popupConfig.saveToPocketBase === true} onCheckedChange={(v) => setPopupConfig({ ...popupConfig, saveToPocketBase: v })} />
                    <Label>Save to PocketBase (leads)</Label>
                  </div>
                </div>
                {/* Visibility */}
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant={popupConfig.visibility?.mode === "all" || !popupConfig.visibility ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, visibility: { mode: "all", include: [], exclude: [] } })}>All pages</Button>
                    <Button type="button" variant={popupConfig.visibility?.mode === "homepage" ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, visibility: { mode: "homepage", include: [], exclude: [] } })}>Homepage only</Button>
                    <Button type="button" variant={popupConfig.visibility?.mode === "include" ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, visibility: { mode: "include", include: ["/"], exclude: [] } })}>Include paths</Button>
                    <Button type="button" variant={popupConfig.visibility?.mode === "exclude" ? "default" : "outline"} onClick={() => setPopupConfig({ ...popupConfig, visibility: { mode: "exclude", include: [], exclude: ["/checkout"] } })}>Exclude paths</Button>
                  </div>
                  {popupConfig.visibility?.mode === "include" && (
                    <div className="grid gap-2">
                      <Label>Include these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea value={(popupConfig.visibility?.include || []).join("\n")} onChange={(e) => setPopupConfig({ ...popupConfig, visibility: { mode: "include", include: e.target.value.split("\n").map(s => s.trim()).filter(Boolean), exclude: [] } })} placeholder={"/\n/shop\n/product/*"} />
                    </div>
                  )}
                  {popupConfig.visibility?.mode === "exclude" && (
                    <div className="grid gap-2">
                      <Label>Exclude these paths (one per line, supports trailing * wildcard)</Label>
                      <Textarea value={(popupConfig.visibility?.exclude || []).join("\n")} onChange={(e) => setPopupConfig({ ...popupConfig, visibility: { mode: "exclude", include: [], exclude: e.target.value.split("\n").map(s => s.trim()).filter(Boolean) } })} placeholder={"/checkout\n/cart"} />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => onSave("popup_banner")} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                  <Button variant="outline" onClick={() => resetToDefault("popup_banner")}>Reset</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        )}

        {/* Google Analytics Configuration */}
        {selected === 'google_analytics' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Google Analytics (GA4)</CardTitle>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enabled</Label>
                <Switch
                  checked={enabled.google_analytics}
                  onCheckedChange={(v) => onToggle("google_analytics", v)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {gaConfig && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                    <p className="font-medium mb-2">📊 Google Analytics is already integrated!</p>
                    <p className="text-muted-foreground">
                      All tracking is handled automatically through <code>src/lib/analytics.ts</code>. 
                      Override values below or use .env defaults.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                    <Input
                      id="ga-measurement-id"
                      value={gaConfig.measurementId || ""}
                      onChange={(e) => setGaConfig({ ...gaConfig, measurementId: e.target.value })}
                      placeholder={import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX"}
                    />
                    <p className="text-xs text-muted-foreground">
                      Default from .env: <code>{import.meta.env.VITE_GA_MEASUREMENT_ID || "Not set"}</code>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onSave("google_analytics")} disabled={saving}>
                      {saving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button variant="outline" onClick={() => resetToDefault("google_analytics")}>
                      Reset to Default
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Google Tag Manager Configuration */}
        {selected === 'google_tag_manager' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Google Tag Manager</CardTitle>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enabled</Label>
                <Switch
                  checked={enabled.google_tag_manager}
                  onCheckedChange={(v) => onToggle("google_tag_manager", v)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {gtmConfig && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                    <p className="font-medium mb-2">🏷️ Google Tag Manager is already integrated!</p>
                    <p className="text-muted-foreground">
                      Manages all your marketing tags. Override values below or use .env defaults.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gtm-container-id">Container ID</Label>
                    <Input
                      id="gtm-container-id"
                      value={gtmConfig.containerId || ""}
                      onChange={(e) => setGtmConfig({ ...gtmConfig, containerId: e.target.value })}
                      placeholder={import.meta.env.VITE_GTM_CONTAINER_ID || "GTM-XXXXXXX"}
                    />
                    <p className="text-xs text-muted-foreground">
                      Default from .env: <code>{import.meta.env.VITE_GTM_CONTAINER_ID || "Not set"}</code>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onSave("google_tag_manager")} disabled={saving}>
                      {saving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button variant="outline" onClick={() => resetToDefault("google_tag_manager")}>
                      Reset to Default
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Facebook Pixel Configuration */}
        {selected === 'facebook_pixel' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Facebook Pixel</CardTitle>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enabled</Label>
                <Switch
                  checked={enabled.facebook_pixel}
                  onCheckedChange={(v) => onToggle("facebook_pixel", v)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {fbConfig && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                    <p className="font-medium mb-2">📘 Facebook Pixel is already integrated!</p>
                    <p className="text-muted-foreground">
                      Track conversions and create custom audiences. Includes CAPI support.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fb-pixel-id">Pixel ID</Label>
                    <Input
                      id="fb-pixel-id"
                      value={fbConfig.pixelId || ""}
                      onChange={(e) => setFbConfig({ ...fbConfig, pixelId: e.target.value })}
                      placeholder={import.meta.env.VITE_FB_PIXEL_ID || "123456789012345"}
                    />
                    <p className="text-xs text-muted-foreground">
                      Default from .env: <code>{import.meta.env.VITE_FB_PIXEL_ID || "Not set"}</code>
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fb-access-token">Access Token (for CAPI)</Label>
                    <Input
                      id="fb-access-token"
                      type="password"
                      value={fbConfig.accessToken || ""}
                      onChange={(e) => setFbConfig({ ...fbConfig, accessToken: e.target.value })}
                      placeholder="Optional - for Conversions API"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onSave("facebook_pixel")} disabled={saving}>
                      {saving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button variant="outline" onClick={() => resetToDefault("facebook_pixel")}>
                      Reset to Default
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Microsoft Clarity Configuration */}
        {selected === 'microsoft_clarity' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Microsoft Clarity</CardTitle>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enabled</Label>
                <Switch
                  checked={enabled.microsoft_clarity}
                  onCheckedChange={(v) => onToggle("microsoft_clarity", v)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {clarityConfig && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                    <p className="font-medium mb-2">🎥 Microsoft Clarity is already integrated!</p>
                    <p className="text-muted-foreground">
                      Session recordings and heatmaps to understand user behavior.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="clarity-project-id">Project ID</Label>
                    <Input
                      id="clarity-project-id"
                      value={clarityConfig.projectId || ""}
                      onChange={(e) => setClarityConfig({ ...clarityConfig, projectId: e.target.value })}
                      placeholder={import.meta.env.VITE_CLARITY_PROJECT_ID || "project-id"}
                    />
                    <p className="text-xs text-muted-foreground">
                      Default from .env: <code>{import.meta.env.VITE_CLARITY_PROJECT_ID || "Not set"}</code>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => onSave("microsoft_clarity")} disabled={saving}>
                      {saving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button variant="outline" onClick={() => resetToDefault("microsoft_clarity")}>
                      Reset to Default
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Custom Scripts Configuration */}
        {selected === 'custom_scripts' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Custom Scripts</CardTitle>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enabled</Label>
                <Switch
                  checked={enabled.custom_scripts}
                  onCheckedChange={(v) => onToggle("custom_scripts", v)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {customScriptsConfig && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                    <p className="font-medium mb-2">📝 Add Custom Scripts to Your Site</p>
                    <p className="text-muted-foreground">
                      Add third-party tracking codes, widgets, or any custom JavaScript/HTML. 
                      Scripts can be injected in &lt;head&gt;, body start, or body end.
                    </p>
                  </div>

                  {customScriptsConfig.scripts && customScriptsConfig.scripts.length > 0 && (
                    <div className="space-y-4">
                      {customScriptsConfig.scripts.map((script, index) => (
                        <Card key={script.id} className="border">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Switch
                                  checked={script.enabled}
                                  onCheckedChange={(v) => {
                                    const updated = [...customScriptsConfig.scripts];
                                    updated[index] = { ...script, enabled: v };
                                    setCustomScriptsConfig({ ...customScriptsConfig, scripts: updated });
                                  }}
                                />
                                <div>
                                  <p className="font-medium">{script.name || `Script ${index + 1}`}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Location: {script.location === 'head' ? '<head>' : script.location === 'body_start' ? '<body> start' : '<body> end'}
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  const updated = customScriptsConfig.scripts.filter((_, i) => i !== index);
                                  setCustomScriptsConfig({ ...customScriptsConfig, scripts: updated });
                                }}
                              >
                                Delete
                              </Button>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor={`script-name-${index}`}>Script Name</Label>
                              <Input
                                id={`script-name-${index}`}
                                value={script.name}
                                onChange={(e) => {
                                  const updated = [...customScriptsConfig.scripts];
                                  updated[index] = { ...script, name: e.target.value };
                                  setCustomScriptsConfig({ ...customScriptsConfig, scripts: updated });
                                }}
                                placeholder="e.g., Google Ads, Hotjar, etc."
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor={`script-location-${index}`}>Inject Location</Label>
                              <select
                                id={`script-location-${index}`}
                                value={script.location}
                                onChange={(e) => {
                                  const updated = [...customScriptsConfig.scripts];
                                  updated[index] = { ...script, location: e.target.value as 'head' | 'body_start' | 'body_end' };
                                  setCustomScriptsConfig({ ...customScriptsConfig, scripts: updated });
                                }}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                <option value="head">&lt;head&gt; - Top of page</option>
                                <option value="body_start">&lt;body&gt; start - After opening body tag</option>
                                <option value="body_end">&lt;body&gt; end - Before closing body tag</option>
                              </select>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor={`script-content-${index}`}>Script Content</Label>
                              <Textarea
                                id={`script-content-${index}`}
                                value={script.script}
                                onChange={(e) => {
                                  const updated = [...customScriptsConfig.scripts];
                                  updated[index] = { ...script, script: e.target.value };
                                  setCustomScriptsConfig({ ...customScriptsConfig, scripts: updated });
                                }}
                                placeholder="<script>console.log('Hello');</script> or just JavaScript code"
                                rows={6}
                                className="font-mono text-xs"
                              />
                              <p className="text-xs text-muted-foreground">
                                Paste the script tag or raw JavaScript code here
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newScript: CustomScript = {
                        id: `script-${Date.now()}`,
                        name: '',
                        script: '',
                        location: 'body_end',
                        enabled: true,
                      };
                      setCustomScriptsConfig({
                        ...customScriptsConfig,
                        scripts: [...(customScriptsConfig.scripts || []), newScript],
                      });
                    }}
                  >
                    + Add New Script
                  </Button>

                  <div className="flex gap-2">
                    <Button onClick={() => onSave("custom_scripts")} disabled={saving}>
                      {saving ? "Saving..." : "Save Configuration"}
                    </Button>
                    <Button variant="outline" onClick={() => resetToDefault("custom_scripts")}>
                      Reset to Default
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        </section>
      </div>

      {/* Video Picker Dialog */}
      <Dialog open={videoPickerOpen} onOpenChange={setVideoPickerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select or Upload Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {loadingVideos ? "Loading videos..." : `${videos.length} video(s)`}
              </div>
              <Input
                type="file"
                accept="video/*"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (f) await handleUploadVideo(f);
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[420px] overflow-auto">
              {videos.map((v) => {
                const url = getContentVideoUrl(v);
                
                const handleVideoSelect = () => {
                  if (selectedVideoField?.type === 'main') {
                    if (vidConfig) setVidConfig({ ...vidConfig, videoUrl: url });
                  } else if (selectedVideoField?.type === 'product' && selectedVideoField.index !== undefined) {
                    if (vidConfig) {
                      const updated = [...(vidConfig.productVideos || [])];
                      updated[selectedVideoField.index] = { ...updated[selectedVideoField.index], videoUrl: url };
                      setVidConfig({ ...vidConfig, productVideos: updated });
                    }
                  } else if (selectedVideoField?.type === 'path' && selectedVideoField.index !== undefined) {
                    if (vidConfig) {
                      const updated = [...(vidConfig.pathConfigs || [])];
                      updated[selectedVideoField.index] = { ...updated[selectedVideoField.index], videoUrl: url };
                      setVidConfig({ ...vidConfig, pathConfigs: updated });
                    }
                  }
                  setVideoPickerOpen(false);
                  setSelectedVideoField(null);
                };
                
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={handleVideoSelect}
                    className="rounded-md border hover:ring-2 hover:ring-primary p-1 text-left"
                    title="Select this video"
                  >
                    <video src={url} className="w-full h-40 object-cover rounded" />
                    <div className="px-1 py-2 text-xs truncate">{v.Videos}</div>
                  </button>
                );
              })}
              {!loadingVideos && videos.length === 0 && (
                <div className="text-sm text-muted-foreground">No videos found. Upload one above.</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Picker Dialog */}
      <Dialog open={imagePickerOpen} onOpenChange={setImagePickerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Select or Upload Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {loadingImages ? "Loading images..." : `${images.length} image(s)`}
              </div>
              <Input type="file" accept="image/*" onChange={async (e) => { const f = e.target.files?.[0]; if (f) await handleUploadImage(f); }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[420px] overflow-auto">
              {images.map((img) => {
                const url = getContentImageUrl(img);
                return (
                  <button key={img.id} type="button" onClick={() => { if (popupConfig) setPopupConfig({ ...popupConfig, imageUrl: url }); setImagePickerOpen(false); }} className="rounded-md border hover:ring-2 hover:ring-primary p-1 text-left" title="Select this image">
                    <img src={url} alt="Content image" className="w-full h-40 object-cover rounded" />
                    <div className="px-1 py-2 text-xs truncate">{img.Images as any}</div>
                  </button>
                );
              })}
              {!loadingImages && images.length === 0 && (
                <div className="text-sm text-muted-foreground">No images found. Upload one above.</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Picker Dialog */}
      <Dialog open={productPickerOpen} onOpenChange={setProductPickerOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Loading state */}
            {loadingProducts && (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-muted-foreground">Loading products...</div>
              </div>
            )}
            
            {/* Products grid */}
            {!loadingProducts && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-auto">
                {filteredProducts.map((product) => {
                  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleProductSelect(product)}
                      className="p-3 border rounded-lg hover:ring-2 hover:ring-primary text-left transition-all hover:shadow-md"
                      title={`Select ${product.name}`}
                    >
                      <div className="space-y-3">
                        {/* Product Image */}
                        <div className="aspect-square bg-muted rounded-md overflow-hidden">
                          {imageUrl ? (
                            <ProductImage
                              url={imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <div className="text-center">
                                <div className="text-2xl mb-1">📦</div>
                                <div className="text-xs">No Image</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Product Info */}
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm line-clamp-2 leading-tight">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              ID: {product.id}
                            </span>
                            {product.price && (
                              <span className="text-xs font-medium">
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* No results */}
            {!loadingProducts && filteredProducts.length === 0 && products.length > 0 && (
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground">
                  No products found matching "{productSearch}"
                </div>
              </div>
            )}
            
            {/* No products at all */}
            {!loadingProducts && products.length === 0 && (
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground">
                  No products found. Please add products first.
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-xs text-muted-foreground">
                {!loadingProducts && `${filteredProducts.length} of ${products.length} products`}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setProductPickerOpen(false);
                  setSelectedProductForVideo(null);
                  setProductSearch("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
