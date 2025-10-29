import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";

export interface ContainerProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "transparent" | "white" | "gray" | "primary";
  className?: string;
}

export const Container: ComponentConfig<ContainerProps> = {
  fields: {
    maxWidth: {
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2X Large", value: "2xl" },
        { label: "Full Width", value: "full" },
      ],
    },
    padding: {
      type: "select",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    background: {
      type: "select",
      options: [
        { label: "Transparent", value: "transparent" },
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Primary", value: "primary" },
      ],
    },
  },
  defaultProps: {
    maxWidth: "xl",
    padding: "md",
    background: "transparent",
  },
  render: ({ maxWidth, padding, background, puck: { renderDropZone } }) => {
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-7xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    };

    const paddingClasses = {
      none: "",
      sm: "px-4 py-2",
      md: "px-6 py-4",
      lg: "px-8 py-6",
      xl: "px-12 py-8",
    };

    const backgroundClasses = {
      transparent: "",
      white: "bg-white",
      gray: "bg-gray-50",
      primary: "bg-primary text-primary-foreground",
    };

    return (
      <div
        className={cn(
          "mx-auto",
          maxWidthClasses[maxWidth || "xl"],
          paddingClasses[padding || "md"],
          backgroundClasses[background || "transparent"]
        )}
      >
        {renderDropZone({ zone: "content" })}
      </div>
    );
  },
};
