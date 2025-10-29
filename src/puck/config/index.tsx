import { Config } from "@measured/puck";
import { Hero } from "./blocks/Hero";
import { ProductGrid } from "./blocks/ProductGrid";
import { CategorySection } from "./blocks/CategorySection";
import { FeatureSection } from "./blocks/FeatureSection";
import { TestimonialSection } from "./blocks/TestimonialSection";
import { NewsletterSection } from "./blocks/NewsletterSection";
import { Text } from "./blocks/Text";
import { Button } from "./blocks/Button";
import { Image } from "./blocks/Image";
import { Spacer } from "./blocks/Spacer";
import { Container } from "./blocks/Container";
import { Grid } from "./blocks/Grid";
import { OfferBanner } from "./blocks/OfferBanner";
import { BrandShowcase } from "./blocks/BrandShowcase";

// Root component configuration
const Root = {
  fields: {
    title: { type: "text" as const },
    description: { type: "textarea" as const },
  },
  render: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div>
      {title && <title>{title}</title>}
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </div>
  ),
};

export const puckConfig: Config = {
  root: Root,
  categories: {
    layout: {
      title: "Layout",
      components: ["Container", "Grid", "Spacer"],
    },
    content: {
      title: "Content",
      components: ["Text", "Image", "Button"],
    },
    ecommerce: {
      title: "E-commerce",
      components: ["Hero", "ProductGrid", "CategorySection", "OfferBanner", "BrandShowcase"],
    },
    marketing: {
      title: "Marketing",
      components: ["FeatureSection", "TestimonialSection", "NewsletterSection"],
    },
  },
  components: {
    // Layout Components
    Container,
    Grid,
    Spacer,
    
    // Content Components
    Text,
    Image,
    Button,
    
    // E-commerce Components
    Hero,
    ProductGrid,
    CategorySection,
    OfferBanner,
    BrandShowcase,
    
    // Marketing Components
    FeatureSection,
    TestimonialSection,
    NewsletterSection,
  },
};

export default puckConfig;
