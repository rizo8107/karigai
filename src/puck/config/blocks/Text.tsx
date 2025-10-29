import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export interface TextProps {
  text: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary" | "secondary";
  align?: "left" | "center" | "right";
  element?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Text: ComponentConfig<TextProps> = {
  fields: {
    text: {
      type: "textarea",
      label: "Text Content",
    },
    size: {
      type: "select",
      options: [
        { label: "Extra Small", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2X Large", value: "2xl" },
        { label: "3X Large", value: "3xl" },
        { label: "4X Large", value: "4xl" },
      ],
    },
    weight: {
      type: "select",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semi Bold", value: "semibold" },
        { label: "Bold", value: "bold" },
      ],
    },
    color: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Muted", value: "muted" },
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    element: {
      type: "select",
      options: [
        { label: "Paragraph", value: "p" },
        { label: "Span", value: "span" },
        { label: "Div", value: "div" },
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
      ],
    },
  },
  defaultProps: {
    text: "Enter your text here",
    size: "base",
    weight: "normal",
    color: "default",
    align: "left",
    element: "p",
  },
  render: ({ text, size, weight, color, align, element }) => {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const colorClasses = {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
    };

    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const Element = element || "p";

    return (
      <Element
        className={cn(
          sizeClasses[size || "base"],
          weightClasses[weight || "normal"],
          colorClasses[color || "default"],
          alignClasses[align || "left"]
        )}
      >
        {text}
      </Element>
    );
  },
};
