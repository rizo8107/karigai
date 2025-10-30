import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface FShapeProps {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  rows: {
    image?: string;
    title?: string;
    body?: string;
    href?: string;
    ctaText?: string;
  }[];
}

export const FShape: ComponentConfig<FShapeProps> = {
  fields: {
    heroTitle: { type: "text", label: "Hero Title" },
    heroSubtitle: { type: "textarea", label: "Hero Subtitle" },
    heroImage: ImageSelector,
    rows: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
        title: { type: "text" },
        body: { type: "textarea" },
        href: { type: "text" },
        ctaText: { type: "text" },
      },
      defaultItemProps: {
        title: "Row title",
        body: "Row description",
      },
      getItemSummary: (i) => i.title || "Row",
    },
  },
  defaultProps: {
    heroTitle: "F-shape layout",
    heroSubtitle: "Guide users down the page with clear content rows.",
    rows: [
      { title: "Row 1", body: "Description" },
      { title: "Row 2", body: "Description" },
    ],
  },
  render: ({ heroTitle, heroSubtitle, heroImage, rows }) => (
    <section className="puck-block w-full">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={heroTitle || ''} className="w-full h-80 md:h-96 object-cover" />
        ) : (
          <div className="w-full h-80 md:h-96 bg-muted" />
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-6 text-white">
          <div className="max-w-3xl">
            {heroTitle && <h2 className="text-3xl md:text-5xl font-semibold mb-2">{heroTitle}</h2>}
            {heroSubtitle && <p className="text-white/90">{heroSubtitle}</p>}
          </div>
        </div>
      </div>

      {/* Rows (text left, image right) */}
      <div className="container mx-auto py-12 space-y-10">
        {(rows || []).map((r, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              {r.title && <h3 className="text-2xl font-semibold mb-2">{r.title}</h3>}
              {r.body && <p className="text-muted-foreground mb-4">{r.body}</p>}
              {r.ctaText && (
                <a href={r.href || '#'} className="inline-flex px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">{r.ctaText}</a>
              )}
            </div>
            <div className="md:col-span-2">
              {r.image && <img src={r.image} alt={r.title || ''} className="w-full h-auto rounded-md object-cover" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
};
