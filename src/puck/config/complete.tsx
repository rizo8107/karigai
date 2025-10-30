import { Config } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

// Import all existing block components
import { Hero } from "./blocks/Hero";
import { ProductGrid } from "./blocks/ProductGrid";
import { KarigaiProductGrid } from "./blocks/KarigaiProductGrid";
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
import { TwoColumn } from "./blocks/TwoColumn";
import { SplitScreen } from "./blocks/SplitScreen";
import { Asymmetrical } from "./blocks/Asymmetrical";
import { FeaturedMedia } from "./blocks/FeaturedMedia";
import { CardGrid } from "./blocks/CardGrid";
import { Masonry } from "./blocks/Masonry";
import { ZShape } from "./blocks/ZShape";
import { FShape } from "./blocks/FShape";
import { Magazine } from "./blocks/Magazine";
import { InteractiveHero } from "./blocks/InteractiveHero";

// Root component configuration
const Root = {
  fields: {
    title: { type: "text" as const, label: "Page Title" },
    description: { type: "textarea" as const, label: "Page Description" },
    thumbnail: ImageSelector,
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

export const completePuckConfig: Config = {
  root: Root,
  categories: {
    ecommerce: {
      title: "E-commerce",
      components: ["Hero", "ProductGrid", "KarigaiProductGrid", "CategorySection", "OfferBanner", "BrandShowcase"],
    },
    marketing: {
      title: "Marketing",
      components: ["FeatureSection", "TestimonialSection", "NewsletterSection", "FeaturedMedia", "InteractiveHero"],
    },
    content: {
      title: "Content",
      components: ["Text", "Button", "Image", "Spacer", "CardGrid", "Magazine"],
    },
    layout: {
      title: "Layout",
      components: ["Container", "Grid", "TwoColumn", "SplitScreen", "Asymmetrical", "Masonry", "ZShape", "FShape"],
    },
  },
  components: {
    // E-commerce Components
    Hero,
    ProductGrid,
    KarigaiProductGrid,
    CategorySection,
    OfferBanner,
    BrandShowcase,
    
    // Marketing Components
    FeatureSection,
    TestimonialSection,
    NewsletterSection,
    FeaturedMedia,
    InteractiveHero,
    
    // Content Components
    Text,
    Button,
    Image,
    Spacer,
    CardGrid,
    Magazine,
    
    // Layout Components
    Container,
    Grid,
    TwoColumn,
    SplitScreen,
    Asymmetrical,
    Masonry,
    ZShape,
    FShape,
  },
};

export default completePuckConfig;
