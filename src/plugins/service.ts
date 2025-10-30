import { pocketbase } from "@/lib/pocketbase";
import type { PluginKey, PluginRecord, WhatsAppPluginConfig, VideoPluginConfig } from "./types";

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

export function parseConfigForKey(key: PluginKey, raw: unknown): WhatsAppPluginConfig | VideoPluginConfig | null {
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
    return {
      enabled: Boolean(obj.enabled),
      zIndex: typeof obj.zIndex === "number" ? obj.zIndex : 60,
      videoUrl: String(obj.videoUrl || ""),
      position,
      autoPlay: Boolean(obj.autoPlay),
      muted: obj.muted !== false,
      width: typeof obj.width === "number" ? obj.width : 320,
      height: typeof obj.height === "number" ? obj.height : 180,
      showClose: obj.showClose !== false,
      offsetX: typeof obj.offsetX === "number" ? obj.offsetX : 16,
      offsetY: typeof obj.offsetY === "number" ? obj.offsetY : 16,
      autoClose: obj.autoClose === true,
      autoCloseAfterMs: typeof obj.autoCloseAfterMs === "number" ? obj.autoCloseAfterMs : 0,
      visibility: {
        mode,
        include: Array.isArray(v.include) ? v.include.map((s: unknown) => String(s)) : [],
        exclude: Array.isArray(v.exclude) ? v.exclude.map((s: unknown) => String(s)) : [],
      },
    } as VideoPluginConfig;
  }
  return null;
}
