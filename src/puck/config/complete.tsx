import { Config } from "@measured/puck";
import { ImageSelector } from "@/puck/fields/ImageSelector";

// Import all existing block components
import { Hero } from "./blocks/Hero";
import { ProductGrid, KarigaiProductGrid } from "./blocks/KarigaiProductGrid";
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
import { ZShape } from "./blocks/ZShape";
import { FShape } from "./blocks/FShape";
import { Magazine } from "./blocks/Magazine";
import { InteractiveHero } from "./blocks/InteractiveHero";
import { CollectionsCarousel } from "./blocks/CollectionsCarousel";

// Root component configuration
const Root = {
  fields: {
    title: { type: "text" as const, label: "Page Title" },
    description: { type: "textarea" as const, label: "Page Description" },
    thumbnail: ImageSelector,
    // Theme controls
    useTheme: { type: "radio" as const, label: "Override Theme", options: [
      { label: "No", value: false },
      { label: "Yes", value: true },
    ]},
    // Primary color (HSL)
    primaryH: { type: "number" as const, label: "Primary Hue (0-360)" },
    primaryS: { type: "number" as const, label: "Primary Sat % (0-100)" },
    primaryL: { type: "number" as const, label: "Primary Light % (0-100)" },
    // Accent color (HSL)
    accentH: { type: "number" as const, label: "Accent Hue (0-360)" },
    accentS: { type: "number" as const, label: "Accent Sat % (0-100)" },
    accentL: { type: "number" as const, label: "Accent Light % (0-100)" },
    // Background / Foreground (HSL)
    backgroundH: { type: "number" as const, label: "Background Hue (0-360)" },
    backgroundS: { type: "number" as const, label: "Background Sat % (0-100)" },
    backgroundL: { type: "number" as const, label: "Background Light % (0-100)" },
    foregroundH: { type: "number" as const, label: "Foreground Hue (0-360)" },
    foregroundS: { type: "number" as const, label: "Foreground Sat % (0-100)" },
    foregroundL: { type: "number" as const, label: "Foreground Light % (0-100)" },
    // Radius
    radiusRem: { type: "number" as const, label: "Border Radius (rem)" },
  },
  render: (props: any) => {
    const { children, title } = props || {};
    const hsl = (h?: number, s?: number, l?: number, fallback?: string) => {
      if (typeof h === 'number' && typeof s === 'number' && typeof l === 'number') {
        return `${h} ${s}% ${l}%`;
      }
      return fallback;
    };
    // Defaults mirror src/index.css base variables
    const styleVars: React.CSSProperties = props?.useTheme ? {
      ['--primary' as any]: hsl(props.primaryH, props.primaryS, props.primaryL, '26 29% 51%'),
      ['--accent' as any]: hsl(props.accentH, props.accentS, props.accentL, '26 29% 65%'),
      ['--background' as any]: hsl(props.backgroundH, props.backgroundS, props.backgroundL, '0 0% 100%'),
      ['--foreground' as any]: hsl(props.foregroundH, props.foregroundS, props.foregroundL, '20 10% 5%'),
      ['--radius' as any]: typeof props.radiusRem === 'number' ? `${props.radiusRem}rem` : undefined,
    } : {};

    return (
      <div>
        {title && <title>{title}</title>}
        <div className="min-h-screen bg-background" style={styleVars}>
          {children}
        </div>
      </div>
    );
  },
};

export const completePuckConfig: Config = {
  root: Root,
  categories: {
    ecommerce: {
      title: "E-commerce",
      components: ["Hero", "ProductGrid", "KarigaiProductGrid", "poructgrind", "CategorySection", "OfferBanner", "BrandShowcase", "CollectionsCarousel"],
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
      components: ["Container", "Grid", "TwoColumn", "SplitScreen", "Asymmetrical", "ZShape", "FShape", "CollectionsCarousel"],
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
    CollectionsCarousel,
    
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
    ZShape,
    FShape,
  },
};

export default completePuckConfig;
