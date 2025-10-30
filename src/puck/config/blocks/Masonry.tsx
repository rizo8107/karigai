import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface MasonryProps {
  columns?: 2 | 3 | 4;
  gap?: number;
  items: { image?: string; title?: string }[];
}

export const Masonry: ComponentConfig<MasonryProps> = {
  fields: {
    columns: { type: "select", options: [
      { label: "2 Columns", value: 2 },
      { label: "3 Columns", value: 3 },
      { label: "4 Columns", value: 4 },
    ]},
    gap: { type: "number", label: "Gap (px)" },
    items: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
        title: { type: "text" },
      },
      defaultItemProps: { title: "", image: "https://via.placeholder.com/600x600" },
      getItemSummary: (i) => i.title || i.image || "Item",
    },
  },
  defaultProps: {
    columns: 3,
    gap: 12,
    items: [
      { image: "https://via.placeholder.com/600x800" },
      { image: "https://via.placeholder.com/600x500" },
      { image: "https://via.placeholder.com/600x700" },
      { image: "https://via.placeholder.com/600x600" },
    ],
  },
  render: ({ columns, gap, items }) => {
    const validItems = (items || []).filter((it) => !!it.image);
    if (validItems.length === 0) {
      return <></>;
    }

    const colCount = columns || 3;
    const map: Record<number, string> = {
      2: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };
    const colCls = map[colCount];
    return (
      <section className="puck-block container mx-auto py-12">
        <div className={`${colCls}`} style={{ gap: gap || 12 }}>
          {validItems.map((it, idx) => (
            <div key={idx} className="grid gap-3" style={{ breakInside: 'avoid' as any }}>
              <img src={it.image!} alt={it.title || ''} loading="lazy" className="block w-full h-auto rounded-md object-cover" />
            </div>
          ))}
        </div>
      </section>
    );
  },
};
