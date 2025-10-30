import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface MagazineProps {
  hero?: {
    image?: string;
    title?: string;
    subtitle?: string;
  };
  sections: {
    image?: string;
    title?: string;
    body?: string;
  }[];
}

export const Magazine: ComponentConfig<MagazineProps> = {
  fields: {
    hero: {
      type: "object",
      objectFields: {
        image: ImageSelector,
        title: { type: "text" },
        subtitle: { type: "textarea" },
      },
    },
    sections: {
      type: "array",
      arrayFields: {
        image: ImageSelector,
        title: { type: "text" },
        body: { type: "textarea" },
      },
      defaultItemProps: { title: "Section", body: "Content" },
      getItemSummary: (i) => i.title || "Section",
    },
  },
  defaultProps: {
    hero: { title: "Magazine Layout", subtitle: "Editorial-style sections" },
    sections: [
      { title: "Feature", body: "Feature content" },
      { title: "Interview", body: "Interview content" },
    ],
  },
  render: ({ hero, sections }) => (
    <section className="puck-block w-full">
      {/* Hero */}
      <div className="relative">
        {hero?.image ? (
          <img src={hero.image} alt={hero.title || ''} className="w-full h-96 object-cover" />
        ) : (
          <div className="w-full h-64 bg-muted" />
        )}
        <div className="absolute inset-0 bg-black/30 text-white flex items-center justify-center text-center px-6">
          <div>
            {hero?.title && <h2 className="text-3xl md:text-5xl font-semibold mb-2">{hero.title}</h2>}
            {hero?.subtitle && <p className="text-white/90">{hero.subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="container mx-auto py-12 space-y-12">
        {(sections || []).map((s, idx) => (
          <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div>
              {s.title && <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>}
              {s.body && <p className="text-muted-foreground">{s.body}</p>}
            </div>
            <div>
              {s.image && <img src={s.image} alt={s.title || ''} className="w-full h-auto rounded-md object-cover" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
};
