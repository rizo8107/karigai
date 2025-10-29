import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Image: ComponentConfig<ImageProps> = {
  fields: {
    src: ImageSelector,
    alt: {
      type: "text",
      label: "Alt Text",
    },
    width: {
      type: "number",
      label: "Width (px)",
    },
    height: {
      type: "number",
      label: "Height (px)",
    },
    objectFit: {
      type: "select",
      options: [
        { label: "Contain", value: "contain" },
        { label: "Cover", value: "cover" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
        { label: "Scale Down", value: "scale-down" },
      ],
    },
    rounded: {
      type: "select",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "Full", value: "full" },
      ],
    },
    shadow: {
      type: "select",
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
    src: "https://via.placeholder.com/400x300",
    alt: "Placeholder image",
    objectFit: "cover",
    rounded: "md",
    shadow: "sm",
  },
  render: ({ src, alt, width, height, objectFit, rounded, shadow }) => {
    const roundedClasses = {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    };

    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    const objectFitClasses = {
      contain: "object-contain",
      cover: "object-cover",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down",
    };

    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "max-w-full h-auto",
          objectFitClasses[objectFit || "cover"],
          roundedClasses[rounded || "md"],
          shadowClasses[shadow || "sm"]
        )}
      />
    );
  },
};
