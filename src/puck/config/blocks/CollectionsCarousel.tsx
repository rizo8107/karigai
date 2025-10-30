import { ComponentConfig } from "@measured/puck";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";
import { pocketbase } from "@/lib/pocketbase";

interface PBFileRecord {
  id: string;
  collectionId: string;
  collectionName: string;
}

export interface CollectionsCarouselProps {
  title?: string;
  description?: string;
  mode?: "grid" | "carousel";
  size?: "sm" | "md" | "lg";
  desktopCount?: number;
  tabletCount?: number;
  mobileCount?: number;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  delayMs?: number;
  source?: "manual" | "pocketbase";
  pbCollection?: string;
  pbLimit?: number;
  pbNameField?: string;
  pbImageField?: string;
  pbSlugField?: string;
  pbHrefPrefix?: string;
  items: Array<{
    name: string;
    image?: string;
    href?: string;
  }>;
}

const sizePx: Record<NonNullable<CollectionsCarouselProps["size"]>, number> = {
  sm: 56,
  md: 72,
  lg: 96,
};

const CollectionsCarouselView = (props: CollectionsCarouselProps) => {
  const {
    title,
    description,
    mode = "grid",
    size = "md",
    desktopCount = 6,
    tabletCount = 4,
    mobileCount = 3,
    showArrows = true,
    showDots = true,
    autoplay = false,
    delayMs = 4000,
    source = "manual",
    pbCollection = "collections",
    pbLimit = 12,
    pbNameField = "name",
    pbImageField = "image",
    pbSlugField = "slug",
    pbHrefPrefix = "/collections/",
    items = [],
  } = props;

  const [data, setData] = useState<Array<{ name: string; image?: string; href?: string }>>(items);
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (source !== "pocketbase") {
        setData(items);
        return;
      }
      try {
        const records = await pocketbase.collection(pbCollection).getList<PBFileRecord & Record<string, unknown>>(1, pbLimit);
        const mapped = (records?.items || []).map((r) => {
          const name = String((r as Record<string, unknown>)[pbNameField] ?? "");
          const file = String((r as Record<string, unknown>)[pbImageField] ?? "");
          const hrefValue = String((r as Record<string, unknown>)[pbSlugField] ?? "");
          const image = file ? (pocketbase.files.getURL(r as PBFileRecord, file) as unknown as string) : undefined;
          const href = hrefValue ? `${pbHrefPrefix}${hrefValue}` : undefined;
          return { name, image, href };
        });
        if (mounted) setData(mapped);
      } catch {
        if (mounted) setData(items);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [source, items, pbCollection, pbLimit, pbNameField, pbImageField, pbSlugField, pbHrefPrefix]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  useEffect(() => {
    const el = containerRef.current;
    const compute = (w: number): "desktop" | "tablet" | "mobile" => (w >= 1024 ? "desktop" : w >= 640 ? "tablet" : "mobile");
    const H = 24;
    let raf: number | null = null;
    const update = (w: number) => {
      setDevice((prev) => {
        if (prev === "desktop") return w < 1024 - H ? compute(w) : prev;
        if (prev === "tablet") return w > 1024 + H || w < 640 - H ? compute(w) : prev;
        return w > 640 + H ? compute(w) : prev;
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
    update(el.clientWidth);
    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const perRow = device === "desktop" ? desktopCount : device === "tablet" ? tabletCount : mobileCount;
  const pages = useMemo(() => {
    if (mode !== "carousel") return [] as Array<Array<{ name: string; image?: string; href?: string }>>;
    const result: Array<Array<{ name: string; image?: string; href?: string }>> = [];
    for (let i = 0; i < data.length; i += perRow) {
      result.push(data.slice(i, i + perRow));
    }
    return result;
  }, [mode, data, perRow]);
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [perRow, data.length, mode]);
  useEffect(() => {
    if (!(mode === "carousel" && autoplay && pages.length > 1)) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages.length), Math.max(1500, delayMs));
    return () => clearInterval(t);
  }, [mode, autoplay, delayMs, pages.length]);

  const avatarSize = sizePx[size];

  const Item = ({ name, image, href }: { name: string; image?: string; href?: string }) => (
    <a href={href || "#"} className="flex flex-col items-center gap-2 text-center">
      <span
        className="rounded-full border bg-muted overflow-hidden"
        style={{ width: avatarSize, height: avatarSize }}
      >
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-xs opacity-60">No image</span>
        )}
      </span>
      <span className="text-sm">{name}</span>
    </a>
  );

  if (mode !== "carousel") {
    return (
      <section ref={containerRef} className="py-10">
        {(title || description) && (
          <div className="text-center mb-6">
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            {description && <p className="text-muted-foreground max-w-2xl mx-auto mt-1">{description}</p>}
          </div>
        )}
        <div className={cn("grid gap-6", `grid-cols-${Math.max(1, mobileCount)}`, `sm:grid-cols-${Math.max(1, tabletCount)}`, `lg:grid-cols-${Math.max(1, desktopCount)}`)}>
          {data.map((it, i) => (
            <Item key={i} {...it} />)
          )}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="py-10 overflow-x-hidden">
      {(title || description) && (
        <div className="text-center mb-6">
          {title && <h3 className="text-2xl font-semibold">{title}</h3>}
          {description && <p className="text-muted-foreground max-w-2xl mx-auto mt-1">{description}</p>}
        </div>
      )}
      <div className="relative">
        {showArrows && pages.length > 1 && (
          <>
            <button aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white h-9 w-9 rounded-full" onClick={() => setPage((p) => Math.max(0, p - 1))}>‹</button>
            <button aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white h-9 w-9 rounded-full" onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}>›</button>
          </>
        )}
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 will-change-transform" style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}>
            {pages.map((group, gi) => (
              <div key={gi} className="shrink-0 w-full">
                <div className={cn("grid gap-6", `grid-cols-${perRow}`)}>
                  {group.map((it, i) => (
                    <Item key={`${gi}-${i}`} {...it} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {showDots && pages.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {pages.map((_, di) => (
              <button key={di} aria-label={`Go to page ${di + 1}`} className={cn("h-2.5 w-2.5 rounded-full", di === page ? "bg-foreground" : "bg-foreground/40")} onClick={() => setPage(di)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const CollectionsCarousel: ComponentConfig<CollectionsCarouselProps> = {
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description (optional)" },
    mode: { type: "select", label: "Display Mode", options: [
      { label: "Grid", value: "grid" },
      { label: "Carousel", value: "carousel" },
    ]},
    size: { type: "select", label: "Avatar Size", options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ]},
    desktopCount: { type: "number", label: "Desktop per row", min: 1, max: 12 },
    tabletCount: { type: "number", label: "Tablet per row", min: 1, max: 12 },
    mobileCount: { type: "number", label: "Mobile per row", min: 1, max: 12 },
    showArrows: { type: "radio", label: "Show Arrows", options: [{ label: "No", value: false }, { label: "Yes", value: true }] },
    showDots: { type: "radio", label: "Show Dots", options: [{ label: "No", value: false }, { label: "Yes", value: true }] },
    autoplay: { type: "radio", label: "Autoplay", options: [{ label: "Off", value: false }, { label: "On", value: true }] },
    delayMs: { type: "number", label: "Autoplay delay (ms)" },
    source: { type: "select", label: "Source", options: [
      { label: "Manual", value: "manual" },
      { label: "PocketBase", value: "pocketbase" },
    ]},
    pbCollection: { type: "text", label: "PB Collection" },
    pbLimit: { type: "number", label: "PB Limit" },
    pbNameField: { type: "text", label: "PB Name field" },
    pbImageField: { type: "text", label: "PB Image field" },
    pbSlugField: { type: "text", label: "PB Slug field" },
    pbHrefPrefix: { type: "text", label: "PB Href prefix" },
    items: {
      type: "array",
      arrayFields: {
        name: { type: "text", label: "Name" },
        image: { ...ImageSelector, label: "Image" },
        href: { type: "text", label: "Link (optional)" },
      },
    },
  },
  defaultProps: {
    title: "Browse Collections",
    description: "Pick a collection to explore products.",
    mode: "grid",
    size: "md",
    desktopCount: 6,
    tabletCount: 4,
    mobileCount: 3,
    showArrows: true,
    showDots: true,
    autoplay: false,
    delayMs: 4000,
    source: "manual",
    pbCollection: "collections",
    pbLimit: 12,
    pbNameField: "name",
    pbImageField: "image",
    pbSlugField: "slug",
    pbHrefPrefix: "/collections/",
    items: [
      { name: "Soaps", image: "", href: "/collections/soaps" },
      { name: "Oils", image: "", href: "/collections/oils" },
      { name: "Powders", image: "", href: "/collections/powders" },
    ],
  },
  render: (props) => <CollectionsCarouselView {...props} />,
};
