import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface OfferBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  discount?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundColor?: "primary" | "secondary" | "accent" | "red" | "green" | "blue";
  textColor?: "white" | "black" | "primary";
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
}

export const OfferBanner: ComponentConfig<OfferBannerProps> = {
  fields: {
    title: {
      type: "text",
      label: "Offer Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle (optional)",
    },
    description: {
      type: "textarea",
      label: "Description (optional)",
    },
    discount: {
      type: "text",
      label: "Discount Text (e.g., '50% OFF')",
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    buttonHref: {
      type: "text",
      label: "Button Link",
    },
    backgroundColor: {
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Accent", value: "accent" },
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
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
    backgroundImage: ImageSelector,
    overlay: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    centered: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
  },
  defaultProps: {
    title: "Special Offer",
    subtitle: "Limited Time Only",
    description: "Don't miss out on this amazing deal",
    discount: "50% OFF",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    backgroundColor: "primary",
    textColor: "white",
    centered: true,
    overlay: false,
  },
  render: ({
    title,
    subtitle,
    description,
    discount,
    buttonText,
    buttonHref,
    backgroundColor,
    textColor,
    backgroundImage,
    overlay,
    centered,
    puck,
  }) => {
    const backgroundClasses = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      red: "bg-red-600",
      green: "bg-green-600",
      blue: "bg-blue-600",
    };

    const textColorClasses = {
      white: "text-white",
      black: "text-black",
      primary: "text-primary",
    };

    return (
      <section
        className={cn(
          "relative py-16 px-4 sm:px-6 lg:px-8",
          !backgroundImage && backgroundClasses[backgroundColor || "primary"],
          textColorClasses[textColor || "white"]
        )}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {overlay && backgroundImage && (
          <div className="absolute inset-0 bg-black/50" />
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className={cn("space-y-6", centered && "text-center")}>
            {discount && (
              <div className="inline-block">
                <span className="text-4xl md:text-6xl font-bold opacity-90">
                  {discount}
                </span>
              </div>
            )}

            {subtitle && (
              <p className="text-lg md:text-xl font-medium opacity-90">
                {subtitle}
              </p>
            )}

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              {title}
            </h2>

            {description && (
              <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
                {description}
              </p>
            )}

            {buttonText && buttonHref && (
              <div className="pt-4">
                <UIButton
                  size="lg"
                  variant="secondary"
                  asChild={!puck?.isEditing}
                  disabled={puck?.isEditing}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  {puck?.isEditing ? (
                    buttonText
                  ) : (
                    <a href={buttonHref}>{buttonText}</a>
                  )}
                </UIButton>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },
};
