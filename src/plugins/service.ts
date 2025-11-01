import { pocketbase } from "@/lib/pocketbase";
import type { PluginKey, PluginRecord, WhatsAppPluginConfig, VideoPluginConfig, PopupBannerConfig } from "./types";

export type StoredPlugin = PluginRecord;

const COLLECTION = "plugins"; // PocketBase collection name

function safeParse<T>(value: unknown, fallback: T): T {
  try {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "object") return value as T;
    if (typeof value === "string") {
      if (value === "" || value === "null") return fallback;
      return JSON.parse(value) as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export async function getAllPlugins(): Promise<StoredPlugin[]> {
  const items = await pocketbase.collection(COLLECTION).getFullList({
    sort: "+created",
    $autoCancel: false,
  });
  return items as unknown as StoredPlugin[];
}

export async function getPluginByKey(key: PluginKey): Promise<StoredPlugin | null> {
  try {
    const item = await pocketbase.collection(COLLECTION).getFirstListItem(`key = "${key}"`, {
      $autoCancel: false,
    });
    return item as unknown as StoredPlugin;
  } catch {
    return null;
  }
}

export async function upsertPlugin(record: Omit<StoredPlugin, "id" | "created" | "updated">): Promise<StoredPlugin> {
  const existing = await getPluginByKey(record.key);
  const data: any = {
    key: record.key,
    enabled: record.enabled,
    // store config as JSON string for safety
    config: JSON.stringify(record.config ?? {}),
  };
  if (existing?.id) {
    const updated = await pocketbase.collection(COLLECTION).update(existing.id, data);
    return updated as unknown as StoredPlugin;
  } else {
    const created = await pocketbase.collection(COLLECTION).create(data);
    return created as unknown as StoredPlugin;
  }
}

export async function togglePlugin(key: PluginKey, enabled: boolean) {
  const existing = await getPluginByKey(key);
  if (!existing) {
    return upsertPlugin({ key, enabled, config: {} });
  }
  const updated = await pocketbase.collection(COLLECTION).update(existing.id!, { enabled });
  return updated as unknown as StoredPlugin;
}

export async function savePluginConfig<T extends object>(key: PluginKey, config: T) {
  const existing = await getPluginByKey(key);
  const data = { config: JSON.stringify(config) };
  if (existing?.id) {
    const updated = await pocketbase.collection(COLLECTION).update(existing.id, data);
    return updated as unknown as StoredPlugin;
  }
  const created = await pocketbase.collection(COLLECTION).create({ key, enabled: false, ...data });
  return created as unknown as StoredPlugin;
}

export function parseConfigForKey(key: PluginKey, raw: unknown): WhatsAppPluginConfig | VideoPluginConfig | PopupBannerConfig | null {
  const obj = safeParse<Record<string, any>>(raw, {});
  if (key === "whatsapp_floating") {
    const v = obj.visibility || {};
    const mode = ["all", "homepage", "include", "exclude"].includes(v.mode)
      ? (v.mode as "all" | "homepage" | "include" | "exclude")
      : "all";
    const allowedPositions = ["bottom-right", "bottom-left", "top-right", "top-left"] as const;
    const position = allowedPositions.includes(obj.position) ? obj.position : "bottom-right";
    return {
      enabled: Boolean(obj.enabled),
      zIndex: typeof obj.zIndex === "number" ? obj.zIndex : 60,
      phoneNumber: String(obj.phoneNumber || ""),
      message: typeof obj.message === "string" ? obj.message : "Hello! I need help.",
      position,
      buttonColor: obj.buttonColor || "#25D366",
      textColor: obj.textColor || "#ffffff",
      iconColor: typeof obj.iconColor === "string" ? obj.iconColor : "#ffffff",
      label: typeof obj.label === "string" ? obj.label : "Chat on WhatsApp",
      showLabel: obj.showLabel !== false,
      showOnMobile: obj.showOnMobile !== false,
      showClose: obj.showClose !== false,
      offsetX: typeof obj.offsetX === "number" ? obj.offsetX : 16,
      offsetY: typeof obj.offsetY === "number" ? obj.offsetY : 16,
      scale: typeof obj.scale === "number" ? obj.scale : 1,
      ringColor: typeof obj.ringColor === "string" ? obj.ringColor : "#ffffff",
      ringWidth: typeof obj.ringWidth === "number" ? obj.ringWidth : 2,
      showRing: obj.showRing !== false,
      autoClose: obj.autoClose === true,
      autoCloseAfterMs: typeof obj.autoCloseAfterMs === "number" ? obj.autoCloseAfterMs : 0,
      visibility: {
        mode,
        include: Array.isArray(v.include) ? v.include.map((s: unknown) => String(s)) : [],
        exclude: Array.isArray(v.exclude) ? v.exclude.map((s: unknown) => String(s)) : [],
      },
    } as WhatsAppPluginConfig;
  }
  if (key === "video_floating") {
    const v = obj.visibility || {};
    const mode = ["all", "homepage", "include", "exclude"].includes(v.mode)
      ? (v.mode as "all" | "homepage" | "include" | "exclude")
      : "all";
    const allowedPositions = ["bottom-right", "bottom-left", "top-right", "top-left"] as const;
    const position = allowedPositions.includes(obj.position) ? obj.position : "bottom-right";
    
    // Handle legacy width/height vs new desktop/mobile structure
    const desktop = obj.desktop || {
      width: typeof obj.width === "number" ? obj.width : 320,
      height: typeof obj.height === "number" ? obj.height : 180
    };
    const mobile = obj.mobile || {
      width: typeof obj.mobile?.width === "number" ? obj.mobile.width : 280,
      height: typeof obj.mobile?.height === "number" ? obj.mobile.height : 160
    };
    
    // Parse shop now button config
    const shopNowButton = obj.shopNowButton ? {
      enabled: Boolean(obj.shopNowButton.enabled),
      text: typeof obj.shopNowButton.text === "string" ? obj.shopNowButton.text : "Shop Now",
      productId: typeof obj.shopNowButton.productId === "string" ? obj.shopNowButton.productId : undefined,
      url: typeof obj.shopNowButton.url === "string" ? obj.shopNowButton.url : undefined,
      position: ["bottom-left", "bottom-right", "bottom-center"].includes(obj.shopNowButton.position) 
        ? obj.shopNowButton.position : "bottom-right",
      backgroundColor: typeof obj.shopNowButton.backgroundColor === "string" ? obj.shopNowButton.backgroundColor : "#000000",
      textColor: typeof obj.shopNowButton.textColor === "string" ? obj.shopNowButton.textColor : "#ffffff"
    } : {
      enabled: true,
      text: "Shop Now",
      position: "bottom-right" as const,
      backgroundColor: "#000000",
      textColor: "#ffffff"
    };
    
    // Parse product videos
    const productVideos = Array.isArray(obj.productVideos) ? obj.productVideos.map((pv: any) => ({
      productId: String(pv.productId || ""),
      videoUrl: String(pv.videoUrl || ""),
      shopNowButton: pv.shopNowButton ? {
        enabled: Boolean(pv.shopNowButton.enabled),
        text: String(pv.shopNowButton.text || "Shop Now"),
        url: String(pv.shopNowButton.url || ""),
        backgroundColor: String(pv.shopNowButton.backgroundColor || "#000000"),
        textColor: String(pv.shopNowButton.textColor || "#ffffff")
      } : undefined
    })) : [];
    
    // Parse path configs
    const pathConfigs = Array.isArray(obj.pathConfigs) ? obj.pathConfigs.map((pc: any) => ({
      paths: Array.isArray(pc.paths) ? pc.paths.map((p: unknown) => String(p)) : [],
      videoUrl: String(pc.videoUrl || ""),
      productVideos: Array.isArray(pc.productVideos) ? pc.productVideos.map((pv: any) => ({
        productId: String(pv.productId || ""),
        videoUrl: String(pv.videoUrl || ""),
        shopNowButton: pv.shopNowButton ? {
          enabled: Boolean(pv.shopNowButton.enabled),
          text: String(pv.shopNowButton.text || "Shop Now"),
          url: String(pv.shopNowButton.url || ""),
          backgroundColor: String(pv.shopNowButton.backgroundColor || "#000000"),
          textColor: String(pv.shopNowButton.textColor || "#ffffff")
        } : undefined
      })) : undefined,
      shopNowButton: pc.shopNowButton ? {
        enabled: Boolean(pc.shopNowButton.enabled),
        text: String(pc.shopNowButton.text || "Shop Now"),
        productId: String(pc.shopNowButton.productId || ""),
        url: String(pc.shopNowButton.url || ""),
        position: ["bottom-left", "bottom-right", "bottom-center"].includes(pc.shopNowButton.position) 
          ? pc.shopNowButton.position : "bottom-right",
        backgroundColor: String(pc.shopNowButton.backgroundColor || "#000000"),
        textColor: String(pc.shopNowButton.textColor || "#ffffff")
      } : undefined
    })) : [];
    
    return {
      enabled: Boolean(obj.enabled),
      zIndex: typeof obj.zIndex === "number" ? obj.zIndex : 60,
      videoUrl: String(obj.videoUrl || ""),
      position,
      autoPlay: Boolean(obj.autoPlay),
      muted: obj.muted !== false,
      showClose: obj.showClose !== false,
      offsetX: typeof obj.offsetX === "number" ? obj.offsetX : 16,
      offsetY: typeof obj.offsetY === "number" ? obj.offsetY : 16,
      autoClose: obj.autoClose === true,
      autoCloseAfterMs: typeof obj.autoCloseAfterMs === "number" ? obj.autoCloseAfterMs : 0,
      desktop,
      mobile,
      shopNowButton,
      productVideos,
      pathConfigs,
      visibility: {
        mode,
        include: Array.isArray(v.include) ? v.include.map((s: unknown) => String(s)) : [],
        exclude: Array.isArray(v.exclude) ? v.exclude.map((s: unknown) => String(s)) : [],
      },
    } as VideoPluginConfig;
  }
  if (key === "popup_banner") {
    const v = obj.visibility || {};
    const mode = ["all", "homepage", "include", "exclude"].includes(v.mode)
      ? (v.mode as "all" | "homepage" | "include" | "exclude")
      : "all";
    const allowedPositions = [
      "center",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "top-center",
      "bottom-center",
    ] as const;
    const position = allowedPositions.includes(obj.position) ? obj.position : "center";
    return {
      enabled: Boolean(obj.enabled),
      zIndex: typeof obj.zIndex === "number" ? obj.zIndex : 70,
      title: typeof obj.title === "string" ? obj.title : "Welcome!",
      subtitle: typeof obj.subtitle === "string" ? obj.subtitle : "Get 10% off on your first purchase",
      imageUrl: typeof obj.imageUrl === "string" ? obj.imageUrl : "",
      couponCode: typeof obj.couponCode === "string" ? obj.couponCode : "",
      ctaLabel: typeof obj.ctaLabel === "string" ? obj.ctaLabel : "Submit",
      requirePhone: obj.requirePhone !== false,
      showConsent: obj.showConsent !== false,
      consentDefault: obj.consentDefault === true,
      privacyLink: typeof obj.privacyLink === "string" ? obj.privacyLink : "/privacy-policy",
      termsLink: typeof obj.termsLink === "string" ? obj.termsLink : "/terms-and-conditions",
      initialDelayMs: typeof obj.initialDelayMs === "number" ? obj.initialDelayMs : 1000,
      frequency: ["every", "session", "days"].includes(obj.frequency) ? obj.frequency : "session",
      daysInterval: typeof obj.daysInterval === "number" ? obj.daysInterval : 7,
      showOnMobile: obj.showOnMobile !== false,
      width: typeof obj.width === "number" ? obj.width : 880,
      showClose: obj.showClose !== false,
      saveToPocketBase: obj.saveToPocketBase === true,
      offsetX: typeof obj.offsetX === "number" ? obj.offsetX : undefined,
      offsetY: typeof obj.offsetY === "number" ? obj.offsetY : undefined,
      position,
      autoClose: obj.autoClose === true,
      autoCloseAfterMs: typeof obj.autoCloseAfterMs === "number" ? obj.autoCloseAfterMs : 0,
      visibility: {
        mode,
        include: Array.isArray(v.include) ? v.include.map((s: unknown) => String(s)) : [],
        exclude: Array.isArray(v.exclude) ? v.exclude.map((s: unknown) => String(s)) : [],
      },
    } as PopupBannerConfig;
  }
  if (key === "custom_scripts") {
    // Parse Custom Scripts config
    const scripts = Array.isArray(obj.scripts)
      ? obj.scripts.map((s: any) => ({
          id: String(s.id || `script-${Date.now()}`),
          name: String(s.name || ""),
          script: String(s.script || ""),
          location: ["head", "body_start", "body_end"].includes(s.location)
            ? (s.location as "head" | "body_start" | "body_end")
            : "head",
          enabled: s.enabled !== false,
        }))
      : [];

    return {
      enabled: Boolean(obj.enabled),
      zIndex: typeof obj.zIndex === "number" ? obj.zIndex : undefined,
      visibility: obj.visibility,
      scripts,
    } as unknown as PopupBannerConfig; // return type union; consumer will cast
  }
  return null;
}
