import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface AsymmetricalProps {
  primaryImage?: string;
  primaryImageFit?: "cover" | "contain" | "fill";
  secondaryImage?: string;
  secondaryImageFit?: "cover" | "contain" | "fill";
  title?: string;
  body?: string;
  ctaText?: string;
  ctaHref?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Asymmetrical: ComponentConfig<AsymmetricalProps> = {
  fields: {
    primaryImage: ImageSelector,
    primaryImageFit: { type: "select", label: "Primary Image Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    secondaryImage: ImageSelector,
    secondaryImageFit: { type: "select", label: "Secondary Image Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    title: { type: "text", label: "Title" },
    body: { type: "textarea", label: "Body" },
    ctaText: { type: "text", label: "CTA Text" },
    ctaHref: { type: "text", label: "CTA Link" },
    padding: { type: "select", label: "Padding", options: [
      { label: "None", value: "none" }, { label: "Small", value: "sm" }, { label: "Medium", value: "md" }, { label: "Large", value: "lg" }, { label: "Extra Large", value: "xl" }] },
  },
  defaultProps: {
    title: "Asymmetrical layout",
    body: "Emphasize a hero image with supporting blocks on the side.",
    padding: "md",
    primaryImageFit: "cover",
    secondaryImageFit: "cover",
  },
  render: ({ primaryImage, primaryImageFit, secondaryImage, secondaryImageFit, title, body, ctaText, ctaHref, padding }) => {
    const paddingClasses = { none: "py-0", sm: "py-4", md: "py-8", lg: "py-12", xl: "py-16" };
    return (
    <section className={`puck-block container mx-auto ${paddingClasses[padding || "md"]}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 relative rounded-lg overflow-hidden bg-muted min-h-[360px]">
          {primaryImage && <img src={primaryImage} alt="primary" className={`absolute inset-0 w-full h-full object-${primaryImageFit || 'cover'}`} />}
          <div className="relative p-8 lg:p-10 bg-gradient-to-t from-black/30 to-transparent text-white h-full flex flex-col justify-end">
            {title && <h2 className="text-3xl font-semibold mb-2">{title}</h2>}
            {body && <p className="text-white/90 mb-4 max-w-2xl">{body}</p>}
            {ctaText && <a href={ctaHref || '#'} className="inline-flex px-4 py-2 rounded-md bg-white text-black w-max">{ctaText}</a>}
          </div>
        </div>
        <div className="grid grid-rows-2 gap-6">
          <div className="relative rounded-lg overflow-hidden bg-muted">
            {secondaryImage && <img src={secondaryImage} alt="secondary" className={`absolute inset-0 w-full h-full object-${secondaryImageFit || 'cover'}`} />}
          </div>
          <div className="rounded-lg border p-6">
            {body && <p className="text-muted-foreground">{body}</p>}
          </div>
        </div>
      </div>
    </section>
    );
  },
};
