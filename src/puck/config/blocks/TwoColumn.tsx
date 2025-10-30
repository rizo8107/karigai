import { ComponentConfig } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface TwoColumnProps {
  layout?: "image-left" | "image-right";
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageObjectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  heading?: string;
  subheading?: string;
  body?: string;
  ctaText?: string;
  ctaHref?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const TwoColumn: ComponentConfig<TwoColumnProps> = {
  fields: {
    layout: { 
      type: "select", 
      label: "Layout", 
      options: [
        { label: "Image Left", value: "image-left" },
        { label: "Image Right", value: "image-right" },
      ]
    },
    image: ImageSelector,
    imageWidth: { type: "number", label: "Image Width (px)", min: 100, max: 2000 },
    imageHeight: { type: "number", label: "Image Height (px)", min: 100, max: 2000 },
    imageObjectFit: {
      type: "select",
      label: "Image Fit",
      options: [
        { label: "Cover (fill area)", value: "cover" },
        { label: "Contain (fit inside)", value: "contain" },
        { label: "Fill (stretch)", value: "fill" },
        { label: "None (original)", value: "none" },
        { label: "Scale Down", value: "scale-down" },
      ],
    },
    heading: { type: "text", label: "Heading" },
    subheading: { type: "text", label: "Subheading" },
    body: { type: "textarea", label: "Body" },
    ctaText: { type: "text", label: "CTA Text" },
    ctaHref: { type: "text", label: "CTA Link" },
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
    layout: "image-left",
    image: "https://via.placeholder.com/800x600",
    heading: "Two-column layout",
    subheading: "Great for feature highlights",
    body: "Use this to describe a feature or value prop with supporting image.",
    ctaText: "Learn more",
    ctaHref: "#",
    padding: "md",
    imageObjectFit: "cover",
  },
  render: ({ layout, image, imageWidth, imageHeight, imageObjectFit, heading, subheading, body, ctaText, ctaHref, padding }) => {
    const paddingClasses = {
      none: "py-0",
      sm: "py-4",
      md: "py-8",
      lg: "py-12",
      xl: "py-16",
    };
    return (
      <section className={`puck-block container mx-auto ${paddingClasses[padding || "md"]}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${layout === 'image-right' ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div>
            <img 
              src={image} 
              alt={heading || 'Two column'} 
              style={{ width: imageWidth ? `${imageWidth}px` : '100%', height: imageHeight ? `${imageHeight}px` : 'auto' }}
              className={`rounded-md object-${imageObjectFit || 'cover'}`}
            />
          </div>
          <div>
            {subheading && <p className="text-sm text-muted-foreground mb-2">{subheading}</p>}
            {heading && <h2 className="text-2xl md:text-3xl font-semibold mb-4">{heading}</h2>}
            {body && <p className="text-muted-foreground mb-6 leading-relaxed">{body}</p>}
            {ctaText && (
              <a href={ctaHref || '#'} className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
                {ctaText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  },
};
