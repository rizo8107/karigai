import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface FeaturedMediaProps {
  media?: string;
  mediaFit?: "cover" | "contain" | "fill";
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  height?: number;
}

export const FeaturedMedia: ComponentConfig<FeaturedMediaProps> = {
  fields: {
    media: ImageSelector,
    mediaFit: { type: "select", label: "Image Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    title: { type: "text", label: "Title" },
    subtitle: { type: "textarea", label: "Subtitle" },
    ctaText: { type: "text", label: "CTA Text" },
    ctaHref: { type: "text", label: "CTA Link" },
    height: { type: "number", label: "Height (px)" },
  },
  defaultProps: {
    title: "Featured image or video",
    subtitle: "Make a bold statement with a large hero media.",
    height: 480,
    mediaFit: "cover",
  },
  render: ({ media, mediaFit, title, subtitle, ctaText, ctaHref, height }) => (
    <section className="puck-block w-full">
      <div className="relative w-full overflow-hidden" style={{ height: height || 480 }}>
        {media ? (
          <img src={media} alt={title || 'featured'} className={`absolute inset-0 w-full h-full object-${mediaFit || 'cover'}`} />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        <div className="relative h-full w-full flex items-center justify-center text-center px-6 bg-black/30 text-white">
          <div className="max-w-3xl">
            {title && <h1 className="text-3xl md:text-5xl font-semibold mb-3">{title}</h1>}
            {subtitle && <p className="text-white/90 mb-5 text-lg">{subtitle}</p>}
            {ctaText && (
              <a href={ctaHref || '#'} className="inline-flex px-5 py-2.5 rounded-md bg-white text-black hover:bg-white/90">{ctaText}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  ),
};
