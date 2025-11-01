import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pluginRegistry } from "./registry";
import { parseConfigForKey, getAllPlugins } from "./service";
import type { PluginKey, WhatsAppPluginConfig, VideoPluginConfig, PopupBannerConfig, CustomScriptsConfig } from "./types";
import Portal from "./Portal";
import { useLocation } from "react-router-dom";

type PluginState = {
  enabled: Record<PluginKey, boolean>;
  configs: Record<PluginKey, WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | CustomScriptsConfig>;
  loading: boolean;
  reload: () => Promise<void>;
};

const PluginsContext = createContext<PluginState | null>(null);

export const usePlugins = () => {
  const ctx = useContext(PluginsContext);
  if (!ctx) throw new Error("usePlugins must be used within PluginProvider");
  return ctx;
};

export const PluginProvider: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState<Record<PluginKey, boolean>>({
    whatsapp_floating: false,
    video_floating: false,
    popup_banner: false,
    google_analytics: false,
    google_tag_manager: false,
    facebook_pixel: false,
    microsoft_clarity: false,
    custom_scripts: false,
  });
  const [configs, setConfigs] = useState<Record<PluginKey, WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | CustomScriptsConfig>>({
    whatsapp_floating: pluginRegistry.whatsapp_floating.defaultConfig,
    video_floating: pluginRegistry.video_floating.defaultConfig,
    popup_banner: pluginRegistry.popup_banner.defaultConfig,
    google_analytics: pluginRegistry.google_analytics.defaultConfig as any,
    google_tag_manager: pluginRegistry.google_tag_manager.defaultConfig as any,
    facebook_pixel: pluginRegistry.facebook_pixel.defaultConfig as any,
    microsoft_clarity: pluginRegistry.microsoft_clarity.defaultConfig as any,
    custom_scripts: pluginRegistry.custom_scripts.defaultConfig as CustomScriptsConfig,
  });
  const { pathname } = useLocation();

  const load = async () => {
    try {
      setLoading(true);
      const items = await getAllPlugins();
      const nextEnabled: Record<PluginKey, boolean> = {
        whatsapp_floating: false,
        video_floating: false,
        popup_banner: false,
        google_analytics: false,
        google_tag_manager: false,
        facebook_pixel: false,
        microsoft_clarity: false,
        custom_scripts: false,
      };
      const nextConfigs: Record<PluginKey, WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | CustomScriptsConfig> = {
        whatsapp_floating: pluginRegistry.whatsapp_floating.defaultConfig,
        video_floating: pluginRegistry.video_floating.defaultConfig,
        popup_banner: pluginRegistry.popup_banner.defaultConfig,
        google_analytics: pluginRegistry.google_analytics.defaultConfig as any,
        google_tag_manager: pluginRegistry.google_tag_manager.defaultConfig as any,
        facebook_pixel: pluginRegistry.facebook_pixel.defaultConfig as any,
        microsoft_clarity: pluginRegistry.microsoft_clarity.defaultConfig as any,
        custom_scripts: pluginRegistry.custom_scripts.defaultConfig as CustomScriptsConfig,
      };

      (Object.keys(pluginRegistry) as PluginKey[]).forEach((key) => {
        // Pick the latest record for this key (items are sorted by +created)
        const matches = items.filter((i) => i.key === key);
        const found = matches.length ? matches[matches.length - 1] : undefined;
        nextEnabled[key] = Boolean(found?.enabled);
        const parsed = (parseConfigForKey(key, found?.config) as any) || pluginRegistry[key].defaultConfig;
        nextConfigs[key] = parsed as WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | CustomScriptsConfig;
      });

      setEnabled(nextEnabled);
      setConfigs(nextConfigs);
      console.debug("[Plugins] Loaded", { enabled: nextEnabled, configs: nextConfigs });
      try {
        localStorage.setItem(
          "plugin_cache",
          JSON.stringify({ enabled: nextEnabled, configs: nextConfigs })
        );
      } catch {}
    } catch (err) {
      console.warn("[Plugins] Failed to fetch from PocketBase, using cached settings if available.", err);
      try {
        const raw = localStorage.getItem("plugin_cache");
        if (raw) {
          const parsed = JSON.parse(raw) as {
            enabled: Record<PluginKey, boolean>;
            configs: Record<PluginKey, WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | CustomScriptsConfig>;
          };
          setEnabled(parsed.enabled);
          setConfigs(parsed.configs);
          console.debug("[Plugins] Restored from cache.");
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const value = useMemo<PluginState>(() => ({ enabled, configs, loading, reload: load }), [enabled, configs, loading]);

  const pathMatches = (path: string, pattern: string) => {
    if (!pattern) return false;
    if (pattern.endsWith("*")) return path.startsWith(pattern.slice(0, -1));
    return path === pattern;
  };

  const isVisibleOnPath = (visibility: (WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig)["visibility"], path: string) => {
    const v = visibility || { mode: "all", include: [], exclude: [] };
    if (v.mode === "all") return true;
    if (v.mode === "homepage") return path === "/";
    if (v.mode === "include") return (v.include || []).some((p) => pathMatches(path, p));
    if (v.mode === "exclude") return !(v.exclude || []).some((p) => pathMatches(path, p));
    return true;
  };

  return (
    <PluginsContext.Provider value={value}>
      {children}
      {/* Render global plugins at the end so they overlay correctly */}
      {!loading && (
        <Portal>
          {(() => {
            const cfg = configs.whatsapp_floating as WhatsAppPluginConfig;
            const merged: WhatsAppPluginConfig = { ...cfg, enabled: enabled.whatsapp_floating };
            return enabled.whatsapp_floating && isVisibleOnPath(merged.visibility, pathname) ? (
              <pluginRegistry.whatsapp_floating.Component config={merged} />
            ) : null;
          })()}
          {(() => {
            const cfg = configs.video_floating as VideoPluginConfig;
            const merged: VideoPluginConfig = { ...cfg, enabled: enabled.video_floating };
            return enabled.video_floating && isVisibleOnPath(merged.visibility, pathname) ? (
              <pluginRegistry.video_floating.Component config={merged} />
            ) : null;
          })()}
          {(() => {
            const cfg = configs.popup_banner as PopupBannerConfig;
            const merged: PopupBannerConfig = { ...cfg, enabled: enabled.popup_banner };
            return enabled.popup_banner && isVisibleOnPath(merged.visibility, pathname) ? (
              <pluginRegistry.popup_banner.Component config={merged} />
            ) : null;
          })()}
          {(() => {
            const cfg = configs.custom_scripts as CustomScriptsConfig;
            const merged: CustomScriptsConfig = { ...cfg, enabled: enabled.custom_scripts };
            return enabled.custom_scripts ? (
              <pluginRegistry.custom_scripts.Component config={merged} />
            ) : null;
          })()}
        </Portal>
      )}
    </PluginsContext.Provider>
  );
};
