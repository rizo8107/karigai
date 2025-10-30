import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface InteractiveHeroProps {
  background?: string;
  backgroundFit?: "cover" | "contain" | "fill";
  title?: string;
  subtitle?: string;
  downLabel?: string;
}

export const InteractiveHero: ComponentConfig<InteractiveHeroProps> = {
  fields: {
    background: ImageSelector,
    backgroundFit: { type: "select", label: "Background Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    title: { type: "text", label: "Title" },
    subtitle: { type: "textarea", label: "Subtitle" },
    downLabel: { type: "text", label: "Scroll Cue Label" },
  },
  defaultProps: {
    title: "Interactive Hero",
    subtitle: "Use the down arrow cue to guide users",
    downLabel: "Scroll",
    backgroundFit: "cover",
  },
  render: ({ background, backgroundFit, title, subtitle, downLabel }) => (
    <section className="puck-block relative w-full h-[70vh] min-h-[440px] overflow-hidden">
      {background ? (
        <img src={background} alt={title || ''} className={`absolute inset-0 w-full h-full object-${backgroundFit || 'cover'}`} />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-center px-6 bg-black/30 text-white">
        <div className="max-w-3xl">
          {title && <h1 className="text-4xl md:text-6xl font-semibold mb-3">{title}</h1>}
          {subtitle && <p className="text-white/90 mb-8 text-lg">{subtitle}</p>}
          <div className="animate-bounce text-white/90 flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {downLabel}
          </div>
        </div>
      </div>
    </section>
  ),
};
