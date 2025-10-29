import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  text: string;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  fullWidth?: boolean;
  disabled?: boolean;
  target?: "_self" | "_blank";
}

export const Button: ComponentConfig<ButtonProps> = {
  fields: {
    text: {
      type: "text",
      label: "Button Text",
    },
    href: {
      type: "text",
      label: "Link URL (optional)",
    },
    variant: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Secondary", value: "secondary" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
      ],
    },
    size: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Large", value: "lg" },
        { label: "Icon", value: "icon" },
      ],
    },
    fullWidth: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    disabled: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    target: {
      type: "select",
      options: [
        { label: "Same Window", value: "_self" },
        { label: "New Window", value: "_blank" },
      ],
    },
  },
  defaultProps: {
    text: "Click me",
    variant: "default",
    size: "default",
    fullWidth: false,
    disabled: false,
    target: "_self",
  },
  render: ({ text, href, variant, size, fullWidth, disabled, target, puck }) => {
    const buttonProps = {
      variant: variant || "default",
      size: size || "default",
      disabled: disabled || puck?.isEditing,
      className: cn(fullWidth && "w-full"),
    };

    if (href && !puck?.isEditing) {
      return (
        <UIButton asChild {...buttonProps}>
          <a href={href} target={target || "_self"}>
            {text}
          </a>
        </UIButton>
      );
    }

    return <UIButton {...buttonProps}>{text}</UIButton>;
  },
};
