export type PluginKey = "whatsapp_floating" | "video_floating";

export interface BasePluginConfig {
  enabled: boolean;
  zIndex?: number;
  visibility?: VisibilityConfig;
  offsetX?: number; // px
  offsetY?: number; // px
  autoClose?: boolean;
  autoCloseAfterMs?: number; // 0 disables
}

export interface VisibilityConfig {
  mode: "all" | "homepage" | "include" | "exclude";
  include?: string[]; // paths, e.g. ["/", "/shop", "/product/"]
  exclude?: string[]; // paths
}

export interface WhatsAppPluginConfig extends BasePluginConfig {
  phoneNumber: string; // in international format without +
  message?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  buttonColor?: string;
  textColor?: string;
  iconColor?: string;
  label?: string;
  showLabel?: boolean;
  showOnMobile?: boolean;
  showClose?: boolean;
  scale?: number; // 0.5 - 2
  ringColor?: string;
  ringWidth?: number; // px
  showRing?: boolean;
}

export interface VideoPluginConfig extends BasePluginConfig {
  videoUrl: string; // youtube embed url or mp4 link
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoPlay?: boolean;
  muted?: boolean;
  width?: number; // px
  height?: number; // px
  showClose?: boolean;
}

export type AnyPluginConfig =
  | { key: "whatsapp_floating"; config: WhatsAppPluginConfig }
  | { key: "video_floating"; config: VideoPluginConfig };

export interface PluginDefinition<T extends BasePluginConfig> {
  key: PluginKey;
  name: string;
  description?: string;
  defaultConfig: T;
  // React component that renders when enabled
  Component: (props: { config: T }) => JSX.Element | null;
}

export interface PluginRecord {
  id?: string;
  key: PluginKey;
  enabled: boolean;
  // stored config can be object or JSON string depending on PocketBase field type
  config: unknown;
  created?: string;
  updated?: string;
}
