import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import type {
  PluginKey,
  PluginDefinition,
  WhatsAppPluginConfig,
  VideoPluginConfig,
  PopupBannerConfig,
  GoogleAnalyticsConfig,
  GoogleTagManagerConfig,
  FacebookPixelConfig,
  MicrosoftClarityConfig,
  ProductVideoMapping,
  PathVideoConfig,
  CustomScriptsConfig,
} from "./types";

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

const PopupBanner: React.FC<{ config: PopupBannerConfig }> = ({ config }) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(Boolean(config.consentDefault));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!config.enabled) return;
    if (config.showOnMobile === false && typeof window !== "undefined" && window.innerWidth < 768) return;
    const key = "pbanner_seen";
    const now = Date.now();
    const show = () => setOpen(true);
    const freq = config.frequency || "session";
    if (freq === "session") {
      if (!sessionStorage.getItem(key)) {
        setTimeout(show, Math.max(0, config.initialDelayMs ?? 0));
      }
    } else if (freq === "days") {
      try {
        const raw = localStorage.getItem(key) || "0";
        const last = Number(raw) || 0;
        const days = Math.max(1, config.daysInterval ?? 7);
        if (now - last > days * 86400000) {
          setTimeout(show, Math.max(0, config.initialDelayMs ?? 0));
        }
      } catch {}
    } else {
      setTimeout(show, Math.max(0, config.initialDelayMs ?? 0));
    }
  }, [config.enabled, config.showOnMobile, config.frequency, config.initialDelayMs, config.daysInterval]);

  const close = () => {
    setOpen(false);
    try {
      const key = "pbanner_seen";
      if ((config.frequency || "session") === "session") sessionStorage.setItem(key, "1");
      else if (config.frequency === "days") localStorage.setItem(key, String(Date.now()));
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (config.requirePhone && !/^\+?\d{7,15}$/.test(phone.replace(/\s|-/g, ""))) return;
    setSubmitted(true);
    if (config.couponCode) {
      try {
        await navigator.clipboard.writeText(config.couponCode);
      } catch {}
    }
    if (config.saveToPocketBase) {
      try {
        // Best-effort lead capture; schema must exist { phone, consent, source, coupon }
        const body: Record<string, unknown> = { phone, consent: Boolean(consent), source: "popup_banner" };
        if (config.couponCode) body.coupon = config.couponCode;
        (await import("@/lib/pocketbase")).pocketbase.collection("leads").create(body);
      } catch {}
    }
  };

  if (!config.enabled || !open) return null;
  const z = config.zIndex ?? 70;
  const maxW = Math.max(600, Math.min(1100, config.width ?? 880));
  const pos = config.position || "center";
  const ox = typeof config.offsetX === 'number' ? config.offsetX : 24;
  const oy = typeof config.offsetY === 'number' ? config.offsetY : 24;
  const modalStyle: React.CSSProperties = (() => {
    switch (pos) {
      case 'top-left':
        return { position: 'fixed', top: oy, left: ox };
      case 'top-right':
        return { position: 'fixed', top: oy, right: ox };
      case 'bottom-left':
        return { position: 'fixed', bottom: oy, left: ox };
      case 'bottom-right':
        return { position: 'fixed', bottom: oy, right: ox };
      case 'top-center':
        return { position: 'fixed', top: oy, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-center':
        return { position: 'fixed', bottom: oy, left: '50%', transform: 'translateX(-50%)' };
      case 'center':
      default:
        return { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  })();
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: z }} aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="bg-white rounded-xl shadow-xl overflow-hidden" style={{ ...modalStyle, maxWidth: maxW }}>
        {/* Mobile image on top */}
        <div className="block md:hidden">
          {config.imageUrl ? (
            <img src={config.imageUrl} alt={config.title || "Offer"} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-40 bg-muted" />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left image */}
          <div className="hidden md:block">
            {config.imageUrl ? (
              <img src={config.imageUrl} alt={config.title || "Offer"} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
          {/* Right content */}
          <div className="p-6 md:p-8 relative">
            {config.showClose !== false && (
              <button aria-label="Close" title="Close" onClick={close} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/70 text-white flex items-center justify-center">×</button>
            )}
            <div className="space-y-4">
              <div>
                {config.title && <h3 className="text-xl md:text-2xl font-semibold">{config.title}</h3>}
                {config.subtitle && <p className="text-sm text-muted-foreground mt-1">{config.subtitle}</p>}
              </div>
              {!submitted ? (
                <form className="space-y-3" onSubmit={onSubmit}>
                  <div>
                    <input
                      type="tel"
                      inputMode="tel"
                      placeholder="Enter Mobile Number"
                      className="w-full border rounded-md h-11 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="Phone number"
                    />
                    {config.requirePhone && <p className="text-xs text-muted-foreground mt-1">We'll send exclusive offers occasionally.</p>}
                  </div>
                  {config.showConsent !== false && (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                      <span>Be first to get notified of updates & offers</span>
                    </label>
                  )}
                  <button type="submit" className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium">
                    {config.ctaLabel || "Submit"}
                  </button>
                  {(config.privacyLink || config.termsLink) && (
                    <p className="text-xs text-muted-foreground">
                      By logging in, you're agreeing to our {config.privacyLink && (<a className="underline" href={config.privacyLink}>Privacy Policy</a>)}{config.privacyLink && config.termsLink && ' and '} {config.termsLink && (<a className="underline" href={config.termsLink}>Terms of Service</a>)}
                    </p>
                  )}
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm">Thank you!</p>
                  {config.couponCode && (
                    <div className="p-3 rounded-md border bg-muted">
                      <span className="text-sm">Your coupon:</span>
                      <div className="font-mono text-lg">{config.couponCode}</div>
                      <p className="text-xs text-muted-foreground">Copied to clipboard</p>
                    </div>
                  )}
                  <button className="w-full h-11 rounded-md border" onClick={close}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoFloating: React.FC<{ config: VideoPluginConfig }> = ({ config }) => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const location = useLocation();
  const params = useParams();
  
  // Extract product ID from pathname since useParams() doesn't work outside Router context
  const isProductPage = location.pathname.startsWith('/product/');
  const currentProductId = isProductPage 
    ? location.pathname.split('/product/')[1]?.split('/')[0] || null
    : null;
  
  console.log('[VideoFloating] URL Params:', { 
    paramsId: params.id, 
    currentProductId, 
    pathname: location.pathname,
    isProductPage,
    extractedFromPath: isProductPage ? location.pathname.split('/product/')[1]?.split('/')[0] : 'N/A'
  });
  
  // Determine which video and config to use based on current path and product
  const activeVideoConfig = useMemo(() => {
    const currentPath = location.pathname;
    
    console.log('[VideoFloating] Config check:', {
      currentPath,
      isProductPage,
      currentProductId,
      hasProductVideos: !!config.productVideos,
      productVideosCount: config.productVideos?.length || 0,
      productVideos: config.productVideos
    });
    
    // Check path-specific configs first
    if (config.pathConfigs) {
      for (const pathConfig of config.pathConfigs) {
        const matchesPath = pathConfig.paths.some(path => {
          if (path.endsWith('*')) {
            return currentPath.startsWith(path.slice(0, -1));
          }
          return currentPath === path;
        });
        
        if (matchesPath) {
          // Check for product-specific video within this path config
          if (currentProductId && pathConfig.productVideos) {
            const productVideo = pathConfig.productVideos.find(pv => pv.productId === currentProductId);
            if (productVideo) {
              return {
                videoUrl: productVideo.videoUrl,
                shopNowButton: productVideo.shopNowButton || pathConfig.shopNowButton
              };
            }
          }
          
          // Use path-specific video
          if (pathConfig.videoUrl) {
            return {
              videoUrl: pathConfig.videoUrl,
              shopNowButton: pathConfig.shopNowButton
            };
          }
        }
      }
    }
    
    // Check global product-specific videos
    if (currentProductId && config.productVideos) {
      const productVideo = config.productVideos.find(pv => pv.productId === currentProductId);
      if (productVideo) {
        console.log('[VideoFloating] Found product-specific video for:', currentProductId);
        return {
          videoUrl: productVideo.videoUrl,
          shopNowButton: productVideo.shopNowButton || config.shopNowButton
        };
      }
    }
    
    // IMPORTANT: If we're on ANY product page, don't show the main video
    // This prevents the main video from showing on product pages
    if (isProductPage) {
      console.log('[VideoFloating] On product page, hiding main video');
      return {
        videoUrl: '',
        shopNowButton: config.shopNowButton
      };
    }
    
    // Fallback to default video (only on non-product pages like homepage)
    console.log('[VideoFloating] Using main video');
    return {
      videoUrl: config.videoUrl,
      shopNowButton: config.shopNowButton
    };
  }, [config, location.pathname, currentProductId, isProductPage]);
  
  useEffect(() => {
    if (config.autoClose && (config.autoCloseAfterMs ?? 0) > 0) {
      setTimeLeft(Math.ceil((config.autoCloseAfterMs || 10000) / 1000));
      
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            setVisible(false);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [config.autoClose, config.autoCloseAfterMs]);
  
  console.log('[VideoFloating] Render check:', {
    enabled: config.enabled,
    hasVideoUrl: !!activeVideoConfig.videoUrl,
    videoUrl: activeVideoConfig.videoUrl,
    visible: visible
  });
  
  if (!config.enabled || !activeVideoConfig.videoUrl || !visible) return null;
  
  const z = config.zIndex ?? 60;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Responsive sizing
  const dimensions = isMobile 
    ? { w: config.mobile?.width ?? 280, h: config.mobile?.height ?? 160 }
    : { w: config.desktop?.width ?? 320, h: config.desktop?.height ?? 180 };
  
  const isYouTube = /youtube|youtu\.be/.test(activeVideoConfig.videoUrl);
  
  // Enhanced YouTube URL for mobile autoplay
  const enhancedVideoUrl = isYouTube && activeVideoConfig.videoUrl 
    ? activeVideoConfig.videoUrl + (activeVideoConfig.videoUrl.includes('?') ? '&' : '?') + 
      `autoplay=${config.autoPlay ? 1 : 0}&mute=${config.muted ? 1 : 0}&playsinline=1&enablejsapi=1`
    : activeVideoConfig.videoUrl;
  
  const style: React.CSSProperties = {
    position: "fixed",
    top: config.position?.startsWith("top-") ? (config.offsetY ?? 16) : undefined,
    bottom: config.position?.startsWith("bottom-") ? (config.offsetY ?? 16) : undefined,
    zIndex: z,
    right: config.position?.endsWith("right") ? (config.offsetX ?? 16) : undefined,
    left: config.position?.endsWith("left") ? (config.offsetX ?? 16) : undefined,
  };
  
  // Shop Now button handler
  const handleShopNow = () => {
    const button = activeVideoConfig.shopNowButton;
    if (!button?.enabled) return;
    
    let targetUrl = button.url;
    if (button.productId) {
      targetUrl = `/product/${button.productId}`;
    } else if (config.shopNowButton?.productId) {
      targetUrl = `/product/${config.shopNowButton.productId}`;
    }
    
    if (targetUrl) {
      window.open(targetUrl, '_blank');
    }
  };
  
  console.debug("[Plugins] Rendering VideoFloating", { 
    enabled: config.enabled, 
    position: config.position, 
    zIndex: z, 
    url: enhancedVideoUrl, 
    isMobile,
    timeLeft,
    dimensions,
    activeVideoConfig,
    shopNowEnabled: activeVideoConfig.shopNowButton?.enabled || config.shopNowButton?.enabled,
    shopNowConfig: activeVideoConfig.shopNowButton || config.shopNowButton,
    style 
  });
  
  return (
    <div style={style}>
      <div className="relative" data-plugin-wrapper>
        {/* Auto-close timer display */}
        {timeLeft !== null && timeLeft > 0 && (
          <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-1 rounded">
            Auto-close in {timeLeft}s
          </div>
        )}
        
        {config.showClose !== false && (
          <button
            aria-label="Close"
            onClick={(e) => {
              const parent = (e.currentTarget.closest('[data-plugin-wrapper]') as HTMLElement) || undefined;
              if (parent) parent.style.display = 'none';
            }}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs shadow hover:bg-black/90 transition-colors z-10"
            title="Close"
          >
            ×
          </button>
        )}
        
        {/* Video Player */}
        <div className="relative">
          {isYouTube ? (
            <iframe
              width={dimensions.w}
              height={dimensions.h}
              src={enhancedVideoUrl}
              title="Video"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-md shadow-lg"
            />
          ) : (
            <video
              width={dimensions.w}
              height={dimensions.h}
              src={activeVideoConfig.videoUrl}
              autoPlay={config.autoPlay}
              muted={config.muted}
              playsInline={isMobile}
              controls
              className="rounded-md shadow-lg"
            />
          )}
          
          {/* Shop Now Overlay Button */}
          {(activeVideoConfig.shopNowButton?.enabled || config.shopNowButton?.enabled) && (
            <button
              onClick={handleShopNow}
              className={cx(
                "absolute px-3 py-1.5 text-sm font-medium rounded-md shadow-lg transition-all hover:scale-105 z-10",
                (activeVideoConfig.shopNowButton?.position || config.shopNowButton?.position) === "bottom-left" && "bottom-2 left-2",
                (activeVideoConfig.shopNowButton?.position || config.shopNowButton?.position) === "bottom-right" && "bottom-2 right-2",
                (activeVideoConfig.shopNowButton?.position || config.shopNowButton?.position) === "bottom-center" && "bottom-2 left-1/2 -translate-x-1/2",
                !(activeVideoConfig.shopNowButton?.position || config.shopNowButton?.position) && "bottom-2 right-2"
              )}
              style={{
                backgroundColor: activeVideoConfig.shopNowButton?.backgroundColor || config.shopNowButton?.backgroundColor || "#000000",
                color: activeVideoConfig.shopNowButton?.textColor || config.shopNowButton?.textColor || "#ffffff"
              }}
              title="Shop Now"
            >
              {activeVideoConfig.shopNowButton?.text || config.shopNowButton?.text || "Shop Now"}
            </button>
          )}
        </div>
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
      desktop: {
        width: 320,
        height: 180
      },
      mobile: {
        width: 280,
        height: 160
      },
      showClose: true,
      autoClose: false,
      autoCloseAfterMs: 10000,
      shopNowButton: {
        enabled: true,
        text: "Shop Now",
        position: "bottom-right",
        backgroundColor: "#000000",
        textColor: "#ffffff"
      },
      productVideos: [],
      pathConfigs: [],
      visibility: { mode: "all", include: [], exclude: [] },
    } as VideoPluginConfig,
    Component: VideoFloating,
  } as PluginDefinition<VideoPluginConfig>,
  popup_banner: {
    key: "popup_banner",
    name: "Popup Banner",
    description: "Promotional popup with optional phone capture and coupon.",
    defaultConfig: {
      enabled: false,
      zIndex: 70,
      title: "Welcome!",
      subtitle: "Get 10% Off on your first purchase",
      imageUrl: "",
      couponCode: "",
      ctaLabel: "Submit",
      requirePhone: true,
      showConsent: true,
      consentDefault: true,
      privacyLink: "/privacy-policy",
      termsLink: "/terms-and-conditions",
      initialDelayMs: 1200,
      frequency: "session",
      daysInterval: 7,
      showOnMobile: true,
      width: 880,
      showClose: true,
      saveToPocketBase: false,
      position: "center",
      visibility: { mode: "all", include: [], exclude: [] },
    } as PopupBannerConfig,
    Component: PopupBanner,
  } as PluginDefinition<PopupBannerConfig>,
  google_analytics: {
    key: "google_analytics",
    name: "Google Analytics (GA4)",
    description: "Track user behavior and e-commerce events with Google Analytics 4.",
    defaultConfig: {
      enabled: false,
      measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
      trackPageViews: true,
      trackEcommerce: true,
      trackUserProperties: true,
    } as GoogleAnalyticsConfig,
    Component: () => null, // Configuration only, no UI component
  } as PluginDefinition<GoogleAnalyticsConfig>,
  google_tag_manager: {
    key: "google_tag_manager",
    name: "Google Tag Manager",
    description: "Manage multiple marketing tags without editing code.",
    defaultConfig: {
      enabled: false,
      containerId: import.meta.env.VITE_GTM_CONTAINER_ID || "",
      dataLayerName: "dataLayer",
      trackPageViews: true,
    } as GoogleTagManagerConfig,
    Component: () => null,
  } as PluginDefinition<GoogleTagManagerConfig>,
  facebook_pixel: {
    key: "facebook_pixel",
    name: "Facebook Pixel",
    description: "Track conversions and create custom audiences for Facebook Ads.",
    defaultConfig: {
      enabled: false,
      pixelId: import.meta.env.VITE_FB_PIXEL_ID || "",
      accessToken: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN || "",
      trackPageViews: true,
      trackEcommerce: true,
      enableCAPI: false,
    } as FacebookPixelConfig,
    Component: () => null,
  } as PluginDefinition<FacebookPixelConfig>,
  microsoft_clarity: {
    key: "microsoft_clarity",
    name: "Microsoft Clarity",
    description: "Session recordings and heatmaps to understand user behavior.",
    defaultConfig: {
      enabled: false,
      projectId: import.meta.env.VITE_CLARITY_PROJECT_ID || "",
      enableRecordings: true,
      enableHeatmaps: true,
    } as MicrosoftClarityConfig,
    Component: () => null,
  } as PluginDefinition<MicrosoftClarityConfig>,
  custom_scripts: {
    key: "custom_scripts",
    name: "Custom Scripts",
    description: "Add custom JavaScript/HTML scripts to your site (tracking codes, widgets, etc.)",
    defaultConfig: {
      enabled: false,
      scripts: [],
    } as CustomScriptsConfig,
    Component: ({ config }) => {
      useEffect(() => {
        // Don't check config.enabled - rely on plugin-level enabled and individual script.enabled
        if (!config.scripts || config.scripts.length === 0) return;

        const enabledScripts = config.scripts.filter(s => s.enabled);
        if (enabledScripts.length === 0) return;
        
        const addedElements: (HTMLScriptElement | HTMLElement)[] = [];

        enabledScripts.forEach((customScript) => {
          const scriptContent = customScript.script.trim();

          // If the content contains any <script> tags, parse and inject ALL of them
          if (scriptContent.includes('<script')) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(scriptContent, 'text/html');
            const parsedScripts = Array.from(doc.querySelectorAll('script'));

            parsedScripts.forEach((parsedScript, idx) => {
              const script = document.createElement('script');
              script.setAttribute('data-custom-script-id', customScript.id);
              script.setAttribute('data-custom-script-name', customScript.name);
              script.setAttribute('data-custom-script-idx', String(idx));

              Array.from(parsedScript.attributes).forEach(attr => {
                script.setAttribute(attr.name, attr.value);
              });
              if (parsedScript.textContent) {
                script.textContent = parsedScript.textContent;
              }

              if (customScript.location === 'head') {
                document.head.appendChild(script);
              } else if (customScript.location === 'body_start') {
                document.body.insertBefore(script, document.body.firstChild);
              } else {
                document.body.appendChild(script);
              }

              addedElements.push(script);
              console.log(`[Custom Scripts] Injected: ${customScript.name} [${idx}]`, script);
            });

            // If there are non-script nodes, we ignore them to avoid executing via innerHTML
          } else if (scriptContent.startsWith('<')) {
            // Generic HTML without <script> tags
            const container = document.createElement('div');
            container.setAttribute('data-custom-script-id', customScript.id);
            container.innerHTML = scriptContent;

            if (customScript.location === 'head') {
              document.head.appendChild(container);
            } else if (customScript.location === 'body_start') {
              document.body.insertBefore(container, document.body.firstChild);
            } else {
              document.body.appendChild(container);
            }

            addedElements.push(container);
          } else {
            // It's raw JavaScript code
            const script = document.createElement('script');
            script.setAttribute('data-custom-script-id', customScript.id);
            script.setAttribute('data-custom-script-name', customScript.name);
            script.textContent = scriptContent;
            
            if (customScript.location === 'head') {
              document.head.appendChild(script);
            } else if (customScript.location === 'body_start') {
              document.body.insertBefore(script, document.body.firstChild);
            } else {
              document.body.appendChild(script);
            }
            
            addedElements.push(script);
          }
        });

        // Cleanup function
        return () => {
          addedElements.forEach(element => {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          });
          console.log('[Custom Scripts] Cleaned up scripts');
        };
      }, [config]);

      return null;
    },
  } as PluginDefinition<CustomScriptsConfig>,
};

export type PluginRegistry = typeof pluginRegistry;
