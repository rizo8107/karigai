import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textAlign?: "left" | "center" | "right";
  textColor?: "white" | "black" | "primary";
  height?: "sm" | "md" | "lg" | "xl" | "screen";
  buttons?: {
    text: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
  }[];
}

export const Hero: ComponentConfig<HeroProps> = {
  fields: {
    title: {
      type: "text",
      label: "Hero Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle (optional)",
    },
    description: {
      type: "textarea",
      label: "Description (optional)",
    },
    backgroundImage: ImageSelector,
    overlay: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (0-100)",
      min: 0,
      max: 100,
    },
    textAlign: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    textColor: {
      type: "select",
      options: [
        { label: "White", value: "white" },
        { label: "Black", value: "black" },
        { label: "Primary", value: "primary" },
      ],
    },
    height: {
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "Full Screen", value: "screen" },
      ],
    },
    buttons: {
      type: "array",
      arrayFields: {
        text: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Outline", value: "outline" },
            { label: "Secondary", value: "secondary" },
          ],
        },
      },
      defaultItemProps: {
        text: "Learn More",
        href: "#",
        variant: "default",
      },
      getItemSummary: (item) => item.text || "Button",
    },
  },
  defaultProps: {
    title: "Welcome to Our Store",
    subtitle: "Discover Amazing Products",
    description: "Find everything you need in our carefully curated collection",
    textAlign: "center",
    textColor: "white",
    height: "lg",
    overlay: true,
    overlayOpacity: 50,
    buttons: [
      { text: "Shop Now", href: "/shop", variant: "default" },
      { text: "Learn More", href: "/about", variant: "outline" },
    ],
  },
  render: ({
    title,
    subtitle,
    description,
    backgroundImage,
    overlay,
    overlayOpacity,
    textAlign,
    textColor,
    height,
    buttons,
    puck,
  }) => {
    const heightClasses = {
      sm: "h-64",
      md: "h-80",
      lg: "h-96",
      xl: "h-[32rem]",
      screen: "h-screen",
    };

    const textAlignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const textColorClasses = {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
    };

    return (
      <section
        className={cn(
          "relative flex items-center justify-center",
          heightClasses[height || "lg"],
          textAlignClasses[textAlign || "center"]
        )}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {overlay && backgroundImage && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: (overlayOpacity || 50) / 100 }}
          />
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("space-y-6", textColorClasses[textColor || "white"])}>
            {subtitle && (
              <p className="text-lg font-medium opacity-90">{subtitle}</p>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
            
            {description && (
              <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
                {description}
              </p>
            )}
            
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center">
                {buttons.map((button, index) => (
                  <UIButton
                    key={index}
                    variant={button.variant || "default"}
                    size="lg"
                    asChild={!puck?.isEditing}
                    disabled={puck?.isEditing}
                  >
                    {puck?.isEditing ? (
                      button.text
                    ) : (
                      <a href={button.href}>{button.text}</a>
                    )}
                  </UIButton>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },
};
