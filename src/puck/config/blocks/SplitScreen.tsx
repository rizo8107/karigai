import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface SplitScreenProps {
  leftBg?: string;
  leftBgFit?: "cover" | "contain" | "fill";
  rightBg?: string;
  rightBgFit?: "cover" | "contain" | "fill";
  leftTitle?: string;
  leftBody?: string;
  leftCtaText?: string;
  leftCtaHref?: string;
  rightTitle?: string;
  rightBody?: string;
  rightCtaText?: string;
  rightCtaHref?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const SplitScreen: ComponentConfig<SplitScreenProps> = {
  fields: {
    leftBg: ImageSelector,
    leftBgFit: { type: "select", label: "Left Image Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    rightBg: ImageSelector,
    rightBgFit: { type: "select", label: "Right Image Fit", options: [
      { label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }, { label: "Fill", value: "fill" }] },
    leftTitle: { type: "text", label: "Left Title" },
    leftBody: { type: "textarea", label: "Left Body" },
    leftCtaText: { type: "text", label: "Left CTA Text" },
    leftCtaHref: { type: "text", label: "Left CTA Link" },
    rightTitle: { type: "text", label: "Right Title" },
    rightBody: { type: "textarea", label: "Right Body" },
    rightCtaText: { type: "text", label: "Right CTA Text" },
    rightCtaHref: { type: "text", label: "Right CTA Link" },
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
    leftTitle: "Left section",
    leftBody: "Use split screen to highlight two options or categories.",
    leftCtaText: "Shop now",
    leftCtaHref: "#",
    rightTitle: "Right section",
    rightBody: "Add compelling copy to drive attention.",
    rightCtaText: "Learn more",
    rightCtaHref: "#",
    padding: "md",
    leftBgFit: "cover",
    rightBgFit: "cover",
  },
  render: (p) => {
    const paddingClasses = {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    };
    return (
      <section className={`puck-block container mx-auto ${paddingClasses[p.padding || "md"]}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden min-h-[320px] bg-muted">
            {p.leftBg && <img src={p.leftBg} alt="left" className={`absolute inset-0 w-full h-full object-${p.leftBgFit || 'cover'}`} />}
            <div className="relative p-8 md:p-10 bg-gradient-to-t from-black/40 to-transparent text-white h-full flex flex-col justify-end">
              {p.leftTitle && <h3 className="text-2xl font-semibold mb-2">{p.leftTitle}</h3>}
              {p.leftBody && <p className="text-white/90 mb-4">{p.leftBody}</p>}
              {p.leftCtaText && (
                <a href={p.leftCtaHref || '#'} className="inline-flex px-4 py-2 rounded-md bg-white text-black hover:bg-white/90 w-max">{p.leftCtaText}</a>
              )}
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden min-h-[320px] bg-muted">
            {p.rightBg && <img src={p.rightBg} alt="right" className={`absolute inset-0 w-full h-full object-${p.rightBgFit || 'cover'}`} />}
            <div className="relative p-8 md:p-10 bg-gradient-to-t from-black/40 to-transparent text-white h-full flex flex-col justify-end">
              {p.rightTitle && <h3 className="text-2xl font-semibold mb-2">{p.rightTitle}</h3>}
              {p.rightBody && <p className="text-white/90 mb-4">{p.rightBody}</p>}
              {p.rightCtaText && (
                <a href={p.rightCtaHref || '#'} className="inline-flex px-4 py-2 rounded-md bg-white text-black hover:bg-white/90 w-max">{p.rightCtaText}</a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
};
