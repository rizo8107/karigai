import { Config } from "@measured/puck";
import { cn } from "@/lib/utils";

// Simple Text Component
const SimpleText = {
  fields: {
    text: { type: "text" as const, label: "Text Content" },
    size: {
      type: "select" as const,
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Medium", value: "text-base" },
        { label: "Large", value: "text-lg" },
        { label: "Extra Large", value: "text-xl" },
      ],
    },
  },
  defaultProps: {
    text: "Enter your text here",
    size: "text-base",
  },
  render: ({ text, size }: { text: string; size: string }) => (
    <p className={cn(size)}>{text}</p>
  ),
};

// Simple Button Component
const SimpleButton = {
  fields: {
    text: { type: "text" as const, label: "Button Text" },
    href: { type: "text" as const, label: "Link URL" },
  },
  defaultProps: {
    text: "Click me",
    href: "#",
  },
  render: ({ text, href }: { text: string; href: string }) => (
    <a
      href={href}
      className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
    >
      {text}
    </a>
  ),
};

// Simple Hero Component
const SimpleHero = {
  fields: {
    title: { type: "text" as const, label: "Hero Title" },
    subtitle: { type: "text" as const, label: "Hero Subtitle" },
  },
  defaultProps: {
    title: "Welcome to Karigai",
    subtitle: "Your amazing ecommerce store",
  },
  render: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl opacity-90">{subtitle}</p>
      </div>
    </section>
  ),
};

// Root component
const Root = {
  render: ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  ),
};

export const minimalPuckConfig: Config = {
  root: Root,
  components: {
    SimpleText,
    SimpleButton,
    SimpleHero,
  },
};

export default minimalPuckConfig;
