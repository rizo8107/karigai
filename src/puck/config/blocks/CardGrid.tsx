import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface CardGridProps {
  columns?: 2 | 3 | 4;
  items: {
    image?: string;
    imageFit?: "cover" | "contain" | "fill";
    imageHeight?: number;
    title?: string;
    body?: string;
    href?: string;
  }[];
}

export const CardGrid: ComponentConfig<CardGridProps> = {
  fields: {
    columns: {
      type: "select",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    items: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
        imageFit: { type: "select", label: "Image Fit", options: [
          { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
        imageHeight: { type: "number", label: "Image Height (px)", min: 100, max: 600 },
        title: { type: "text" },
        body: { type: "textarea" },
        href: { type: "text" },
      },
      defaultItemProps: {
        title: "Card title",
        body: "Card description",
      },
      getItemSummary: (i) => i.title || i.href || "Card",
    },
  },
  defaultProps: {
    columns: 3,
    items: [
      { title: "Card 1", body: "Description" },
      { title: "Card 2", body: "Description" },
      { title: "Card 3", body: "Description" },
    ],
  },
  render: ({ columns, items }) => {
    const cls = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns || 3];
    return (
      <section className="puck-block container mx-auto py-12">
        <div className={`grid ${cls} gap-6`}>
          {items.map((it, idx) => (
            <a key={idx} href={it.href || '#'} className="group block rounded-lg border overflow-hidden hover:shadow-md transition">
              {it.image && <img src={it.image} alt={it.title || ''} style={{ height: it.imageHeight ? `${it.imageHeight}px` : '176px' }} className={`w-full object-${it.imageFit || 'cover'}`} />}
              <div className="p-4">
                {it.title && <h3 className="font-semibold mb-1 group-hover:text-primary">{it.title}</h3>}
                {it.body && <p className="text-muted-foreground text-sm">{it.body}</p>}
              </div>
            </a>
          ))}
        </div>
      </section>
    );
  },
};
