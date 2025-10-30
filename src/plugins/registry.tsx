import React, { useEffect, useState } from "react";
import { PluginDefinition, WhatsAppPluginConfig, VideoPluginConfig } from "./types";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const WhatsAppFloating: React.FC<{ config: WhatsAppPluginConfig }> = ({ config }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (config.autoClose && (config.autoCloseAfterMs ?? 0) > 0) {
      const t = setTimeout(() => setVisible(false), config.autoCloseAfterMs);
      return () => clearTimeout(t);
    }
  }, [config.autoClose, config.autoCloseAfterMs]);
  if (!config.enabled || !visible) return null;
  if (config.showOnMobile === false && typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }
  const href = `https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.message || "Hello!")}`;
  const z = config.zIndex ?? 60;
  const style: React.CSSProperties = {
    position: "fixed",
    top: config.position?.startsWith("top-") ? (config.offsetY ?? 16) : undefined,
    bottom: config.position?.startsWith("bottom-") ? (config.offsetY ?? 16) : undefined,
    zIndex: z,
    right: config.position?.endsWith("right") ? (config.offsetX ?? 16) : undefined,
    left: config.position?.endsWith("left") ? (config.offsetX ?? 16) : undefined,
  };
  console.debug("[Plugins] Rendering WhatsAppFloating", { enabled: config.enabled, position: config.position, zIndex: z });
  return (
    <div style={style}> 
      <div className="relative" style={{ transform: `scale(${config.scale ?? 1})`, transformOrigin: (config.position?.includes('left') ? 'left' : 'right') + ' ' + (config.position?.includes('top') ? 'top' : 'bottom') }}>
        {config.showClose !== false && (
          <button
            aria-label="Close"
            onClick={() => setVisible(false)}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs shadow"
            title="Close"
          >
            ×
          </button>
        )}
        {config.showLabel === false ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: config.buttonColor || "#25D366",
              color: config.iconColor || config.textColor || "#ffffff",
              border: config.showRing !== false ? `${config.ringWidth ?? 2}px solid ${config.ringColor ?? "#ffffff"}` : undefined,
            }}
            data-plugin-wrapper
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor" role="img" aria-hidden="true">
              <path d="M19.11 17.47c-.28-.14-1.63-.8-1.88-.89-.26-.1-.45-.14-.63.14-.19.28-.72.89-.88 1.07-.16.19-.33.21-.61.07-.33-.16-1.38-.51-2.64-1.62-.97-.86-1.62-1.92-1.81-2.25-.19-.33-.02-.51.14-.65.14-.14.33-.37.49-.56.16-.19.21-.33.33-.56.1-.21.05-.4-.02-.56-.07-.14-.63-1.52-.86-2.08-.23-.56-.47-.49-.63-.49h-.54c-.19 0-.49.07-.75.37-.26.28-.98.96-.98 2.34 0 1.37 1.01 2.7 1.15 2.88.14.19 1.99 3.04 4.82 4.26.67.28 1.19.45 1.6.58.67.21 1.28.19 1.76.12.54-.09 1.63-.67 1.86-1.32.23-.65.23-1.21.16-1.32-.05-.13-.21-.19-.49-.33zM16.02 3.2C9.94 3.2 5 8.14 5 14.22c0 2.43.83 4.67 2.22 6.46L6 26.8l6.27-1.65c1.76.97 3.79 1.52 5.95 1.52 6.08 0 11.02-4.94 11.02-11.02.02-6.08-4.92-11.02-10.99-11.02h-.23zM16.22 24.9c-1.87 0-3.61-.54-5.08-1.47l-.37-.23-3.78.99 1.01-3.67-.24-.38c-1.24-1.7-1.97-3.78-1.97-6.01 0-5.72 4.65-10.37 10.37-10.37s10.37 4.65 10.37 10.37c0 5.72-4.65 10.37-10.31 10.37z" />
            </svg>
          </a>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full h-12 px-4 shadow-lg hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: config.buttonColor || "#25D366",
              color: config.textColor || "#ffffff",
              border: config.showRing !== false ? `${config.ringWidth ?? 2}px solid ${config.ringColor ?? "#ffffff"}` : undefined,
            }}
            data-plugin-wrapper
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="currentColor" role="img" aria-hidden="true" style={{ color: config.iconColor || config.textColor || "#ffffff" }}>
              <path d="M19.11 17.47c-.28-.14-1.63-.8-1.88-.89-.26-.1-.45-.14-.63.14-.19.28-.72.89-.88 1.07-.16.19-.33.21-.61.07-.33-.16-1.38-.51-2.64-1.62-.97-.86-1.62-1.92-1.81-2.25-.19-.33-.02-.51.14-.65.14-.14.33-.37.49-.56.16-.19.21-.33.33-.56.1-.21.05-.4-.02-.56-.07-.14-.63-1.52-.86-2.08-.23-.56-.47-.49-.63-.49h-.54c-.19 0-.49.07-.75.37-.26.28-.98.96-.98 2.34 0 1.37 1.01 2.7 1.15 2.88.14.19 1.99 3.04 4.82 4.26.67.28 1.19.45 1.6.58.67.21 1.28.19 1.76.12.54-.09 1.63-.67 1.86-1.32.23-.65.23-1.21.16-1.32-.05-.13-.21-.19-.49-.33zM16.02 3.2C9.94 3.2 5 8.14 5 14.22c0 2.43.83 4.67 2.22 6.46L6 26.8l6.27-1.65c1.76.97 3.79 1.52 5.95 1.52 6.08 0 11.02-4.94 11.02-11.02.02-6.08-4.92-11.02-10.99-11.02h-.23zM16.22 24.9c-1.87 0-3.61-.54-5.08-1.47l-.37-.23-3.78.99 1.01-3.67-.24-.38c-1.24-1.7-1.97-3.78-1.97-6.01 0-5.72 4.65-10.37 10.37-10.37s10.37 4.65 10.37 10.37c0 5.72-4.65 10.37-10.31 10.37z" />
            </svg>
            <span className="text-sm font-medium">{config.label || "Chat on WhatsApp"}</span>
          </a>
        )}
      </div>
    </div>
  );
};

const VideoFloating: React.FC<{ config: VideoPluginConfig }> = ({ config }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (config.autoClose && (config.autoCloseAfterMs ?? 0) > 0) {
      const t = setTimeout(() => setVisible(false), config.autoCloseAfterMs);
      return () => clearTimeout(t);
    }
  }, [config.autoClose, config.autoCloseAfterMs]);
  if (!config.enabled || !config.videoUrl || !visible) return null;
  const z = config.zIndex ?? 60;
  const w = config.width ?? 320;
  const h = config.height ?? 180;
  const isYouTube = /youtube|youtu\.be/.test(config.videoUrl);
  const style: React.CSSProperties = {
    position: "fixed",
    top: config.position?.startsWith("top-") ? (config.offsetY ?? 16) : undefined,
    bottom: config.position?.startsWith("bottom-") ? (config.offsetY ?? 16) : undefined,
    zIndex: z,
    right: config.position?.endsWith("right") ? (config.offsetX ?? 16) : undefined,
    left: config.position?.endsWith("left") ? (config.offsetX ?? 16) : undefined,
  };
  console.debug("[Plugins] Rendering VideoFloating", { enabled: config.enabled, position: config.position, zIndex: z, url: config.videoUrl, style });
  return (
    <div style={style}>
      <div className="relative" data-plugin-wrapper>
        {config.showClose !== false && (
          <button
            aria-label="Close"
            onClick={(e) => {
              const parent = (e.currentTarget.closest('[data-plugin-wrapper]') as HTMLElement) || undefined;
              if (parent) parent.style.display = 'none';
            }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs shadow"
            title="Close"
          >
            ×
          </button>
        )}
        {isYouTube ? (
          <iframe
            width={w}
            height={h}
            src={config.videoUrl}
            title="Video"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md shadow-lg"
          />
        ) : (
          <video
            width={w}
            height={h}
            src={config.videoUrl}
            autoPlay={config.autoPlay}
            muted={config.muted}
            controls
            className="rounded-md shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export const pluginRegistry = {
  whatsapp_floating: {
    key: "whatsapp_floating",
    name: "WhatsApp Floating Button",
    description: "Floating WhatsApp contact button.",
    defaultConfig: {
      enabled: false,
      zIndex: 60,
      phoneNumber: "919999999999",
      message: "Hello! I need help.",
      position: "bottom-right",
      buttonColor: "#25D366",
      textColor: "#ffffff",
      iconColor: "#ffffff",
      label: "Chat on WhatsApp",
      showLabel: true,
      showOnMobile: true,
      showClose: true,
      ringColor: "#ffffff",
      ringWidth: 2,
      showRing: true,
      autoClose: false,
      autoCloseAfterMs: 0,
      visibility: { mode: "all", include: [], exclude: [] },
    } as WhatsAppPluginConfig,
    Component: WhatsAppFloating,
  } as PluginDefinition<WhatsAppPluginConfig>,
  video_floating: {
    key: "video_floating",
    name: "Video Floating",
    description: "Floating video player for promos or help.",
    defaultConfig: {
      enabled: false,
      zIndex: 60,
      videoUrl: "",
      position: "bottom-right",
      autoPlay: false,
      muted: true,
      width: 320,
      height: 180,
      showClose: true,
      autoClose: false,
      autoCloseAfterMs: 0,
      visibility: { mode: "all", include: [], exclude: [] },
    } as VideoPluginConfig,
    Component: VideoFloating,
  } as PluginDefinition<VideoPluginConfig>,
};

export type PluginRegistry = typeof pluginRegistry;
