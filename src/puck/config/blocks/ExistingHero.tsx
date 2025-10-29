import { ComponentConfig } from "@measured/puck";
// Import your existing component
import YourExistingHero from "@/components/YourExistingHero"; // Replace with actual path

export interface ExistingHeroProps {
  // Add any props your existing component needs
  title?: string;
  subtitle?: string;
  // ... other props from your existing component
}

export const ExistingHero: ComponentConfig<ExistingHeroProps> = {
  fields: {
    title: { type: "text", label: "Hero Title" },
    subtitle: { type: "text", label: "Hero Subtitle" },
    // Add fields for any props your component accepts
  },
  defaultProps: {
    title: "Welcome to Karigai",
    subtitle: "Your existing hero component",
  },
  render: ({ title, subtitle, ...props }) => (
    <YourExistingHero 
      title={title}
      subtitle={subtitle}
      {...props}
    />
  ),
};
