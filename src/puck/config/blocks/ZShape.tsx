import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface ZShapeProps {
  steps: {
    image?: string;
    imageFit?: "cover" | "contain" | "fill";
    imageHeight?: number;
    title?: string;
    body?: string;
    ctaText?: string;
    ctaHref?: string;
  }[];
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const ZShape: ComponentConfig<ZShapeProps> = {
  fields: {
    steps: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
        imageFit: { type: "select", label: "Image Fit", options: [
          { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
        imageHeight: { type: "number", label: "Image Height (px)", min: 200, max: 800 },
        title: { type: "text" },
        body: { type: "textarea" },
        ctaText: { type: "text" },
        ctaHref: { type: "text" },
      },
      defaultItemProps: {
        title: "Section title",
        body: "Describe this section",
      },
      getItemSummary: (i) => i.title || "Z step",
    },
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
  },
  defaultProps: {
    steps: [
      { title: "Step 1", body: "Content for step 1" },
      { title: "Step 2", body: "Content for step 2" },
      { title: "Step 3", body: "Content for step 3" },
    ],
    padding: "md",
  },
  render: ({ steps, padding }) => {
    const paddingClasses = {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    };
    return (
    <section className={`puck-block container mx-auto ${paddingClasses[padding || "md"]}`}>
      <div className="flex flex-col gap-12">
        {(steps || []).map((s, idx) => (
          <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div className="rounded-lg overflow-hidden bg-muted" style={{ minHeight: s.imageHeight ? `${s.imageHeight}px` : '260px' }}>
              {s.image && <img src={s.image} alt={s.title || ''} className={`w-full h-full object-${s.imageFit || 'cover'}`} />}
            </div>
            <div>
              {s.title && <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>}
              {s.body && <p className="text-muted-foreground mb-4">{s.body}</p>}
              {s.ctaText && (
                <a href={s.ctaHref || '#'} className="inline-flex px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">{s.ctaText}</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    );
  },
};
