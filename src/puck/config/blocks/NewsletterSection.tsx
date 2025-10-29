import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: "white" | "gray" | "primary" | "secondary";
  textColor?: "default" | "white" | "primary";
  centered?: boolean;
}

export const NewsletterSection: ComponentConfig<NewsletterSectionProps> = {
  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },
    subtitle: {
      type: "text",
      label: "Subtitle",
    },
    description: {
      type: "textarea",
      label: "Description",
    },
    placeholder: {
      type: "text",
      label: "Email Input Placeholder",
    },
    buttonText: {
      type: "text",
      label: "Button Text",
    },
    backgroundColor: {
      type: "select",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
    textColor: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "White", value: "white" },
        { label: "Primary", value: "primary" },
      ],
    },
    centered: {
      type: "radio",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },
  defaultProps: {
    title: "Stay Updated",
    subtitle: "Subscribe to our newsletter",
    description: "Get the latest updates on new products and exclusive offers",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    backgroundColor: "primary",
    textColor: "white",
    centered: true,
  },
  render: ({
    title,
    subtitle,
    description,
    placeholder,
    buttonText,
    backgroundColor,
    textColor,
    centered,
    puck,
  }) => {
    const backgroundClasses = {
      white: "bg-white",
      gray: "bg-gray-50",
      primary: "bg-primary",
      secondary: "bg-secondary",
    };

    const textColorClasses = {
      default: "text-foreground",
      white: "text-white",
      primary: "text-primary",
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!puck?.isEditing) {
        // Handle newsletter subscription
        console.log("Newsletter subscription submitted");
      }
    };

    return (
      <section
        className={cn(
          "py-16",
          backgroundClasses[backgroundColor || "primary"],
          textColorClasses[textColor || "white"]
        )}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("space-y-8", centered && "text-center")}>
            <div className="space-y-4">
              {subtitle && (
                <p className="text-lg font-medium opacity-90">{subtitle}</p>
              )}
              
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
              )}
              
              {description && (
                <p className="text-lg opacity-80 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex flex-col sm:flex-row gap-4 max-w-md",
                centered && "mx-auto"
              )}
            >
              <Input
                type="email"
                placeholder={placeholder || "Enter your email"}
                className="flex-1 bg-white text-black"
                disabled={puck?.isEditing}
                required
              />
              <UIButton
                type="submit"
                variant="secondary"
                disabled={puck?.isEditing}
                className="bg-white text-black hover:bg-gray-100"
              >
                {buttonText || "Subscribe"}
              </UIButton>
            </form>

            <p className="text-sm opacity-70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    );
  },
};
