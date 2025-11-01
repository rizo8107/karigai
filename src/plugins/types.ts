export type PluginKey = 
  | "whatsapp_floating" 
  | "video_floating" 
  | "popup_banner"
  | "google_analytics"
  | "google_tag_manager"
  | "facebook_pixel"
  | "microsoft_clarity"
  | "custom_scripts";

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
  // Video sources - can be single URL or multiple product-specific videos
  videoUrl?: string; // fallback/default video URL
  productVideos?: ProductVideoMapping[]; // product-specific videos
  
  // Display settings
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoPlay?: boolean;
  muted?: boolean;
  showClose?: boolean;
  
  // Responsive sizing
  desktop?: {
    width?: number; // px
    height?: number; // px
  };
  mobile?: {
    width?: number; // px
    height?: number; // px
  };
  
  // Shop Now overlay button
  shopNowButton?: {
    enabled?: boolean;
    text?: string;
    productId?: string; // link to specific product
    url?: string; // or custom URL
    position?: "bottom-left" | "bottom-right" | "bottom-center";
    backgroundColor?: string;
    textColor?: string;
  };
  
  // Path-specific visibility (extends base visibility)
  pathConfigs?: PathVideoConfig[];
}

export interface ProductVideoMapping {
  productId: string;
  videoUrl: string;
  shopNowButton?: {
    enabled?: boolean;
    text?: string;
    url?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

export interface PathVideoConfig {
  paths: string[]; // e.g. ["/", "/shop", "/product/*"]
  videoUrl?: string;
  productVideos?: ProductVideoMapping[];
  shopNowButton?: {
    enabled?: boolean;
    text?: string;
    productId?: string;
    url?: string;
    position?: "bottom-left" | "bottom-right" | "bottom-center";
    backgroundColor?: string;
    textColor?: string;
  };
}

export interface PopupBannerConfig extends BasePluginConfig {
  // Modal content
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  couponCode?: string;
  ctaLabel?: string; // Submit button label
  requirePhone?: boolean; // if true, phone is required to submit
  showConsent?: boolean; // show marketing consent checkbox
  consentDefault?: boolean;
  privacyLink?: string;
  termsLink?: string;
  // Behavior
  initialDelayMs?: number; // delay before first show
  frequency?: "every" | "session" | "days"; // show strategy
  daysInterval?: number; // used when frequency === 'days'
  showOnMobile?: boolean;
  width?: number; // px of modal max width
  showClose?: boolean;
  saveToPocketBase?: boolean; // save phone/consent to 'leads' collection
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
}

// Analytics Plugin Configurations
export interface GoogleAnalyticsConfig extends BasePluginConfig {
  measurementId: string; // G-XXXXXXXXXX
  trackPageViews?: boolean;
  trackEcommerce?: boolean;
  trackUserProperties?: boolean;
}

export interface GoogleTagManagerConfig extends BasePluginConfig {
  containerId: string; // GTM-XXXXXXX
  dataLayerName?: string;
  trackPageViews?: boolean;
}

export interface FacebookPixelConfig extends BasePluginConfig {
  pixelId: string; // Numeric ID
  accessToken?: string; // For CAPI
  trackPageViews?: boolean;
  trackEcommerce?: boolean;
  enableCAPI?: boolean;
}

export interface MicrosoftClarityConfig extends BasePluginConfig {
  projectId: string; // UUID-like
  enableRecordings?: boolean;
  enableHeatmaps?: boolean;
}

export interface CustomScript {
  id: string;
  name: string;
  script: string; // The actual script content
  location: "head" | "body_start" | "body_end"; // Where to inject
  enabled: boolean;
}

export interface CustomScriptsConfig extends BasePluginConfig {
  scripts: CustomScript[];
}

export type AnyPluginConfig =
  | { key: "whatsapp_floating"; config: WhatsAppPluginConfig }
  | { key: "video_floating"; config: VideoPluginConfig }
  | { key: "popup_banner"; config: PopupBannerConfig }
  | { key: "google_analytics"; config: GoogleAnalyticsConfig }
  | { key: "google_tag_manager"; config: GoogleTagManagerConfig }
  | { key: "facebook_pixel"; config: FacebookPixelConfig }
  | { key: "microsoft_clarity"; config: MicrosoftClarityConfig }
  | { key: "custom_scripts"; config: CustomScriptsConfig };

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
