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
import type { PluginKey, WhatsAppPluginConfig, VideoPluginConfig, PopupBannerConfig } from "@/plugins/types";
import { getContentItems, uploadVideo, getContentVideoUrl, type ContentItem, getContentImageUrl, uploadImage } from "@/lib/content-service";

export default function PluginsManager() {
  const { enabled, configs, loading, reload } = usePlugins();

  const [waConfig, setWaConfig] = useState<WhatsAppPluginConfig | null>(null);
  const [vidConfig, setVidConfig] = useState<VideoPluginConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [videoPickerOpen, setVideoPickerOpen] = useState(false);
  const [videos, setVideos] = useState<ContentItem[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [popupConfig, setPopupConfig] = useState<PopupBannerConfig | null>(null);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [images, setImages] = useState<ContentItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selected, setSelected] = useState<PluginKey>("whatsapp_floating");

  useEffect(() => {
    if (!loading) {
      setWaConfig(configs.whatsapp_floating as WhatsAppPluginConfig);
      setVidConfig(configs.video_floating as VideoPluginConfig);
      setPopupConfig(configs.popup_banner as PopupBannerConfig);
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
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = (key: PluginKey) => {
    if (key === "whatsapp_floating") setWaConfig(pluginRegistry.whatsapp_floating.defaultConfig);
    if (key === "video_floating") setVidConfig(pluginRegistry.video_floating.defaultConfig);
    if (key === "popup_banner") setPopupConfig(pluginRegistry.popup_banner.defaultConfig);
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
      if (vidConfig) setVidConfig({ ...vidConfig, videoUrl: url });
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
                      onClick={async () => { setVideoPickerOpen(true); await loadVideos(); }}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="vid-w">Width (px)</Label>
                    <Input
                      id="vid-w"
                      type="number"
                      value={vidConfig.width ?? 320}
                      onChange={(e) => setVidConfig({ ...vidConfig, width: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vid-h">Height (px)</Label>
                    <Input
                      id="vid-h"
                      type="number"
                      value={vidConfig.height ?? 180}
                      onChange={(e) => setVidConfig({ ...vidConfig, height: Number(e.target.value) })}
                    />
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
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      if (vidConfig) setVidConfig({ ...vidConfig, videoUrl: url });
                      setVideoPickerOpen(false);
                    }}
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
    </div>
  );
}
