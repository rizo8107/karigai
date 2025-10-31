import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";
import { useEffect, useRef, useState } from "react";

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  heroUrl?: string;
  heroUrlTarget?: "_self" | "_blank";
  backgroundImage?: string;
  backgroundImageDesktop?: string;
  backgroundImageTablet?: string;
  backgroundImageMobile?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
  textColor?: "white" | "black" | "primary";
  height?: "sm" | "md" | "lg" | "xl" | "screen";
  // device-specific display controls
  bgFitDesktop?: "cover" | "contain" | "fill";
  bgFitTablet?: "cover" | "contain" | "fill";
  bgFitMobile?: "cover" | "contain" | "fill";
  bgPosDesktop?: "center" | "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
  bgPosTablet?: "center" | "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
  bgPosMobile?: "center" | "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
  heightDesktop?: "sm" | "md" | "lg" | "xl" | "screen";
  heightTablet?: "sm" | "md" | "lg" | "xl" | "screen";
  heightMobile?: "sm" | "md" | "lg" | "xl" | "screen";
  paddingYDesktop?: number;
  paddingYTablet?: number;
  paddingYMobile?: number;
  buttons?: {
    text: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
    target?: "_self" | "_blank";
  }[];
  mode?: "single" | "slider";
  // slider options
  sliderAutoplay?: boolean;
  sliderDelay?: number; // ms
  sliderLoop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  transitionMs?: number;
  slides?: HeroSlide[];
}

export interface HeroSlide {
  title?: string;
  subtitle?: string;
  description?: string;
  heroUrl?: string;
  heroUrlTarget?: "_self" | "_blank";
  backgroundImage?: string;
  backgroundImageDesktop?: string;
  backgroundImageTablet?: string;
  backgroundImageMobile?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
  textColor?: "white" | "black" | "primary";
  buttons?: {
    text: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
    target?: "_self" | "_blank";
  }[];
}

export const Hero: ComponentConfig<HeroProps> = {
  fields: {
    title: {
      type: "text",
      label: "Hero Title",
    },
    mode: {
      type: "select",
      label: "Mode",
      options: [
        { label: "Single", value: "single" },
        { label: "Slider", value: "slider" },
      ],
    },
    subtitle: {
      type: "text",
      label: "Subtitle (optional)",
    },
    description: {
      type: "textarea",
      label: "Description (optional)",
    },
    heroUrl: {
      type: "text",
      label: "Hero Link URL (optional - makes entire hero clickable)",
    },
    heroUrlTarget: {
      type: "select",
      label: "Hero Link Target",
      options: [
        { label: "Same Tab", value: "_self" },
        { label: "New Tab", value: "_blank" },
      ],
    },
    backgroundImage: { ...ImageSelector, label: "Main image (default fallback)" },
    backgroundImageDesktop: { ...ImageSelector, label: "Desktop image (≥1024px)" },
    backgroundImageTablet: { ...ImageSelector, label: "Tablet image (≥640px)" },
    backgroundImageMobile: { ...ImageSelector, label: "Mobile image (<640px)" },
    overlay: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (0-100)",
      min: 0,
      max: 100,
    },
    textAlign: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    textColor: {
      type: "select",
      options: [
        { label: "White", value: "white" },
        { label: "Black", value: "black" },
        { label: "Primary", value: "primary" },
      ],
    },
    height: {
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "Full Screen", value: "screen" },
      ],
    },
    // Device specific controls
    bgFitDesktop: { type: "select", label: "Desktop: Background fit", options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Fill", value: "fill" },
    ]},
    bgFitTablet: { type: "select", label: "Tablet: Background fit", options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Fill", value: "fill" },
    ]},
    bgFitMobile: { type: "select", label: "Mobile: Background fit", options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Fill", value: "fill" },
    ]},
    bgPosDesktop: { type: "select", label: "Desktop: Background position", options: [
      { label: "Center", value: "center" },
      { label: "Top", value: "top" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
      { label: "Top Left", value: "top left" },
      { label: "Top Right", value: "top right" },
      { label: "Bottom Left", value: "bottom left" },
      { label: "Bottom Right", value: "bottom right" },
    ]},
    bgPosTablet: { type: "select", label: "Tablet: Background position", options: [
      { label: "Center", value: "center" },
      { label: "Top", value: "top" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
      { label: "Top Left", value: "top left" },
      { label: "Top Right", value: "top right" },
      { label: "Bottom Left", value: "bottom left" },
      { label: "Bottom Right", value: "bottom right" },
    ]},
    bgPosMobile: { type: "select", label: "Mobile: Background position", options: [
      { label: "Center", value: "center" },
      { label: "Top", value: "top" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
      { label: "Top Left", value: "top left" },
      { label: "Top Right", value: "top right" },
      { label: "Bottom Left", value: "bottom left" },
      { label: "Bottom Right", value: "bottom right" },
    ]},
    heightDesktop: { type: "select", label: "Desktop: Height", options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
      { label: "Full Screen", value: "screen" },
    ]},
    heightTablet: { type: "select", label: "Tablet: Height", options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
      { label: "Full Screen", value: "screen" },
    ]},
    heightMobile: { type: "select", label: "Mobile: Height", options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
      { label: "Extra Large", value: "xl" },
      { label: "Full Screen", value: "screen" },
    ]},
    paddingYDesktop: { type: "number", label: "Desktop: Padding Y (px)" },
    paddingYTablet: { type: "number", label: "Tablet: Padding Y (px)" },
    paddingYMobile: { type: "number", label: "Mobile: Padding Y (px)" },
    buttons: {
      type: "array",
      arrayFields: {
        text: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Outline", value: "outline" },
            { label: "Secondary", value: "secondary" },
          ],
        },
        target: {
          type: "select",
          label: "Link Target",
          options: [
            { label: "Same Tab", value: "_self" },
            { label: "New Tab", value: "_blank" },
          ],
        },
      },
      defaultItemProps: {
        text: "Learn More",
        href: "#",
        variant: "default",
        target: "_self",
      },
      getItemSummary: (item) => item.text || "Button",
    },
    // Slider options
    sliderAutoplay: { type: "radio", options: [{ label: "Off", value: false }, { label: "On", value: true }] },
    sliderDelay: { type: "number", label: "Autoplay delay (ms)" },
    sliderLoop: { type: "radio", options: [{ label: "No loop", value: false }, { label: "Loop", value: true }] },
    showDots: { type: "radio", options: [{ label: "Hide dots", value: false }, { label: "Show dots", value: true }] },
    showArrows: { type: "radio", options: [{ label: "Hide arrows", value: false }, { label: "Show arrows", value: true }] },
    transitionMs: { type: "number", label: "Transition (ms)" },
    slides: {
      type: "array",
      arrayFields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        description: { type: "textarea" },
        heroUrl: { type: "text", label: "Slide Link URL (optional)" },
        heroUrlTarget: {
          type: "select",
          label: "Slide Link Target",
          options: [
            { label: "Same Tab", value: "_self" },
            { label: "New Tab", value: "_blank" },
          ],
        },
        backgroundImage: { ...ImageSelector, label: "Slide main image (fallback)" },
        backgroundImageDesktop: { ...ImageSelector, label: "Slide desktop image (≥1024px)" },
        backgroundImageTablet: { ...ImageSelector, label: "Slide tablet image (≥640px)" },
        backgroundImageMobile: { ...ImageSelector, label: "Slide mobile image (<640px)" },
        overlay: { type: "radio", options: [{ label: "No", value: false }, { label: "Yes", value: true }] },
        overlayOpacity: { type: "number" },
        textAlign: { type: "radio", options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ]},
        textColor: { type: "select", options: [
          { label: "White", value: "white" },
          { label: "Black", value: "black" },
          { label: "Primary", value: "primary" },
        ]},
        buttons: {
          type: "array",
          arrayFields: {
            text: { type: "text" },
            href: { type: "text" },
            variant: { type: "select", options: [
              { label: "Default", value: "default" },
              { label: "Outline", value: "outline" },
              { label: "Secondary", value: "secondary" },
            ]},
            target: {
              type: "select",
              label: "Link Target",
              options: [
                { label: "Same Tab", value: "_self" },
                { label: "New Tab", value: "_blank" },
              ],
            },
          },
          defaultItemProps: { text: "Learn More", href: "#", variant: "default", target: "_self" },
          getItemSummary: (it) => it.text || "Button",
        },
      },
      defaultItemProps: {
        title: "Welcome",
        subtitle: "Discover",
        description: "",
      },
      getItemSummary: (it) => it.title || "Slide",
    },
  },
  defaultProps: {
    title: "Welcome to Our Store",
    subtitle: "Discover Amazing Products",
    description: "Find everything you need in our carefully curated collection",
    heroUrlTarget: "_self",
    textAlign: "center",
    textColor: "white",
    height: "lg",
    overlay: true,
    overlayOpacity: 50,
    mode: "single",
    sliderAutoplay: true,
    sliderDelay: 5000,
    sliderLoop: true,
    showDots: true,
    showArrows: true,
    transitionMs: 400,
    slides: [],
    buttons: [
      { text: "Shop Now", href: "/shop", variant: "default", target: "_self" },
      { text: "Learn More", href: "/about", variant: "outline", target: "_self" },
    ],
  },
  render: (props) => {
    const View: React.FC<typeof props> = ({
      title,
      subtitle,
      description,
      heroUrl,
      heroUrlTarget,
      backgroundImage,
      backgroundImageDesktop,
      backgroundImageTablet,
      backgroundImageMobile,
      overlay,
      overlayOpacity,
      textAlign,
      textColor,
      height,
      heightDesktop,
      heightTablet,
      heightMobile,
      bgFitDesktop,
      bgFitTablet,
      bgFitMobile,
      bgPosDesktop,
      bgPosTablet,
      bgPosMobile,
      paddingYDesktop,
      paddingYTablet,
      paddingYMobile,
      buttons,
      mode,
      sliderAutoplay,
      sliderDelay,
      sliderLoop,
      showDots,
      showArrows,
      transitionMs,
      slides,
      puck,
    }) => {
    const heightClasses = {
      sm: "h-64",
      md: "h-80",
      lg: "h-96",
      xl: "h-[32rem]",
      screen: "h-screen",
    };

    const textAlignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const textColorClasses = {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
    useEffect(() => {
      const el = containerRef.current;
      const compute = (w: number): "desktop" | "tablet" | "mobile" => (w >= 1024 ? "desktop" : w >= 640 ? "tablet" : "mobile");
      const H = 24; // hysteresis in px to avoid jitter around breakpoints
      let lastW = 0;
      let raf: number | null = null;
      const update = (w: number) => {
        lastW = w;
        setDevice((prev) => {
          // Apply hysteresis around thresholds based on current device
          if (prev === "desktop") {
            if (w < 1024 - H) return compute(w);
            return prev;
          }
          if (prev === "tablet") {
            if (w > 1024 + H || w < 640 - H) return compute(w);
            return prev;
          }
          // prev === "mobile"
          if (w > 640 + H) return compute(w);
          return prev;
        });
      };

      if (!el || typeof ResizeObserver === "undefined") {
        const w = typeof window !== "undefined" ? window.innerWidth : 0;
        update(w);
        return;
      }
      const ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect?.width || 0;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => update(w));
      });
      ro.observe(el);
      // initialize
      update(el.clientWidth);
      return () => {
        ro.disconnect();
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);
    const effFit = device === "desktop" ? (bgFitDesktop || "cover") : device === "tablet" ? (bgFitTablet || "cover") : (bgFitMobile || "cover");
    const effPos = device === "desktop" ? (bgPosDesktop || "center") : device === "tablet" ? (bgPosTablet || "center") : (bgPosMobile || "center");
    const effHeightKey = device === "desktop" ? (heightDesktop || height) : device === "tablet" ? (heightTablet || height) : (heightMobile || height);
    const effPaddingY = device === "desktop" ? (paddingYDesktop || 0) : device === "tablet" ? (paddingYTablet || 0) : (paddingYMobile || 0);

    const [index, setIndex] = useState(0);
    const total = slides?.length ?? 0;
    useEffect(() => {
      if (!(mode === "slider" && sliderAutoplay && total > 1)) return;
      const t = setInterval(() => {
        setIndex((i) => {
          const next = i + 1;
          if (next < total) return next;
          return sliderLoop ? 0 : i;
        });
      }, Math.max(1000, sliderDelay || 5000));
      return () => clearInterval(t);
    }, [mode, sliderAutoplay, sliderDelay, sliderLoop, total]);

    const go = (dir: number) => {
      setIndex((i) => {
        const n = i + dir;
        if (n < 0) return sliderLoop ? total - 1 : 0;
        if (n >= total) return sliderLoop ? 0 : total - 1;
        return n;
      });
    };

      if (mode === "slider" && slides && slides.length > 0) {
        return (
        <section ref={containerRef} className={cn("relative overflow-hidden", heightClasses[effHeightKey || "lg"]) }>
          {/* Slides */}
          <div className="absolute inset-0">
            {slides.map((s, i) => {
              const resolveBg = () => {
                if (device === "desktop" && s.backgroundImageDesktop) return s.backgroundImageDesktop;
                if (device === "tablet" && s.backgroundImageTablet) return s.backgroundImageTablet;
                if (device === "mobile" && s.backgroundImageMobile) return s.backgroundImageMobile;
                return s.backgroundImage || "";
              };
              const active = i === index;
              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity"
                  style={{
                    opacity: active ? 1 : 0,
                    transitionDuration: `${Math.max(100, transitionMs || 400)}ms`,
                    backgroundImage: resolveBg() ? `url(${resolveBg()})` : undefined,
                    backgroundSize: effFit,
                    backgroundPosition: effPos,
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {(s.overlay ?? overlay) && (s.backgroundImage || s.backgroundImageDesktop || s.backgroundImageTablet || s.backgroundImageMobile) && (
                    <div
                      className="absolute inset-0 bg-black"
                      style={{ opacity: ((s.overlayOpacity ?? overlayOpacity ?? 50) as number) / 100 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Content of active slide */}
          {slides.map((s, i) => {
            const active = i === index;
            const sTextColor = s.textColor || textColor || "white";
            const sAlign = s.textAlign || textAlign || "center";
            const slideHeroUrl = s.heroUrl || heroUrl;
            const slideHeroTarget = s.heroUrlTarget || heroUrlTarget || "_self";
            const contentInner = (
              <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={cn("space-y-6", textColorClasses[sTextColor])}>
                  {s.subtitle && <p className="text-lg font-medium opacity-90">{s.subtitle}</p>}
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">{s.title || title}</h1>
                  {(s.description || description) && (
                    <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">{s.description || description}</p>
                  )}
                  {(s.buttons || buttons)?.length ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                      {(s.buttons || buttons)!.map((button, bi) => (
                        <UIButton
                          key={bi}
                          variant={button.variant || "default"}
                          size="lg"
                          asChild={!puck?.isEditing}
                          disabled={puck?.isEditing}
                        >
                          {puck?.isEditing ? button.text : <a href={button.href} target={button.target || "_self"} rel={button.target === "_blank" ? "noopener noreferrer" : undefined}>{button.text}</a>}
                        </UIButton>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
            return (
              <div
                key={`content-${i}`}
                className={cn("absolute inset-0 flex items-center justify-center", textAlignClasses[sAlign])}
                aria-hidden={!active}
                style={{ opacity: active ? 1 : 0, transition: `opacity ${Math.max(100, transitionMs || 400)}ms` }}
              >
                {slideHeroUrl && !puck?.isEditing ? (
                  <a
                    href={slideHeroUrl}
                    target={slideHeroTarget}
                    rel={slideHeroTarget === "_blank" ? "noopener noreferrer" : undefined}
                    className="absolute inset-0 z-[5]"
                    aria-label="Hero link"
                  />
                ) : null}
                {contentInner}
              </div>
            );
          })}

          {/* Arrows */}
          {showArrows !== false && total > 1 && (
            <>
              <button aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white h-10 w-10 rounded-full" onClick={() => go(-1)}>‹</button>
              <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white h-10 w-10 rounded-full" onClick={() => go(1)}>›</button>
            </>
          )}

          {/* Dots */}
          {showDots !== false && total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, di) => (
                <button
                  key={di}
                  aria-label={`Go to slide ${di + 1}`}
                  className={cn("h-2.5 w-2.5 rounded-full", di === index ? "bg-white" : "bg-white/50")}
                  onClick={() => setIndex(di)}
                />
              ))}
            </div>
          )}
        </section>
      );
      }

    // Single mode
    const desktopBg = backgroundImageDesktop || backgroundImage || "";
    const tabletBg = backgroundImageTablet || backgroundImage || "";
    const mobileBg = backgroundImageMobile || backgroundImage || "";
    return (
      <section
        className={cn(
          "relative flex items-center justify-center",
          heightClasses[effHeightKey || "lg"],
          textAlignClasses[textAlign || "center"]
        )}
        style={{
          paddingTop: effPaddingY ? `${effPaddingY}px` : undefined,
          paddingBottom: effPaddingY ? `${effPaddingY}px` : undefined,
        }}
        ref={containerRef}
      >
        {/* Responsive background layers */}
        <div
          className="absolute inset-0 block sm:hidden"
          style={{
            backgroundImage: mobileBg ? `url(${mobileBg})` : undefined,
            backgroundSize: effFit,
            backgroundPosition: effPos,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 hidden sm:block lg:hidden"
          style={{
            backgroundImage: tabletBg ? `url(${tabletBg})` : undefined,
            backgroundSize: effFit,
            backgroundPosition: effPos,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: desktopBg ? `url(${desktopBg})` : undefined,
            backgroundSize: effFit,
            backgroundPosition: effPos,
            backgroundRepeat: "no-repeat",
          }}
        />

        {overlay && (desktopBg || tabletBg || mobileBg) && (
          <div className="absolute inset-0 bg-black" style={{ opacity: (overlayOpacity || 50) / 100 }} />
        )}

        {heroUrl && !puck?.isEditing ? (
          <a
            href={heroUrl}
            target={heroUrlTarget || "_self"}
            rel={heroUrlTarget === "_blank" ? "noopener noreferrer" : undefined}
            className="absolute inset-0 z-[5]"
            aria-label="Hero link"
          />
        ) : null}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("space-y-6", textColorClasses[textColor || "white"]) }>
            {subtitle && <p className="text-lg font-medium opacity-90">{subtitle}</p>}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">{title}</h1>
            {description && (
              <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">{description}</p>
            )}
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center">
                {buttons.map((button, index) => (
                  <UIButton
                    key={index}
                    variant={button.variant || "default"}
                    size="lg"
                    asChild={!puck?.isEditing}
                    disabled={puck?.isEditing}
                  >
                    {puck?.isEditing ? button.text : <a href={button.href} target={button.target || "_self"} rel={button.target === "_blank" ? "noopener noreferrer" : undefined}>{button.text}</a>}
                  </UIButton>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
    };

    return <View {...props} />;
  },
};
