import { useState } from "react";
import { X } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  data: any; // Puck page data structure
}

const templates: Template[] = [
  {
    id: "hero-features-cta",
    name: "Hero + Features + CTA",
    description: "Landing page with hero section, feature cards, and call-to-action",
    thumbnail: "https://via.placeholder.com/400x300?text=Hero+Features+CTA",
    data: {
      content: [
        { type: "Hero", props: { title: "Welcome to Our Product", subtitle: "Transform your business" } },
        { type: "FeatureSection", props: { title: "Key Features" } },
        { type: "Button", props: { text: "Get Started", href: "#" } },
      ],
    },
  },
  {
    id: "split-testimonials",
    name: "Split Screen + Testimonials",
    description: "Two-panel layout with customer testimonials",
    thumbnail: "https://via.placeholder.com/400x300?text=Split+Testimonials",
    data: {
      content: [
        { type: "SplitScreen", props: { leftTitle: "Our Story", rightTitle: "Our Mission" } },
        { type: "TestimonialSection", props: { 
          title: "What Customers Say",
          testimonials: [
            { name: "John Doe", role: "Customer", content: "Great service!", rating: 5 },
            { name: "Jane Smith", role: "Client", content: "Highly recommended!", rating: 5 },
          ]
        } },
      ],
    },
  },
  {
    id: "ecommerce-home",
    name: "E-commerce Homepage",
    description: "Complete shop homepage with hero, products, and newsletter",
    thumbnail: "https://via.placeholder.com/400x300?text=Shop+Home",
    data: {
      content: [
        { type: "Hero", props: { title: "Shop Amazing Products" } },
        { type: "CategorySection", props: {} },
        { type: "KarigaiProductGrid", props: { title: "Featured Products", limit: 8 } },
        { type: "NewsletterSection", props: {} },
      ],
    },
  },
  {
    id: "magazine-layout",
    name: "Magazine Layout",
    description: "Editorial-style content layout",
    thumbnail: "https://via.placeholder.com/400x300?text=Magazine",
    data: {
      content: [
        { type: "Magazine", props: { hero: { title: "Latest Articles" } } },
      ],
    },
  },
  {
    id: "services-grid",
    name: "Services Grid",
    description: "Service offerings in a card grid",
    thumbnail: "https://via.placeholder.com/400x300?text=Services",
    data: {
      content: [
        { type: "Text", props: { text: "<h1>Our Services</h1>" } },
        { type: "CardGrid", props: { columns: 3 } },
      ],
    },
  },
  {
    id: "about-us",
    name: "About Us Page",
    description: "Company story and team section",
    thumbnail: "https://via.placeholder.com/400x300?text=About+Us",
    data: {
      content: [
        { type: "TwoColumn", props: { heading: "About Our Company", layout: "image-left" } },
        { type: "FeatureSection", props: { title: "Our Values" } },
      ],
    },
  },
  {
    id: "landing-minimal",
    name: "Minimal Landing",
    description: "Clean landing page with focused message",
    thumbnail: "https://via.placeholder.com/400x300?text=Minimal",
    data: {
      content: [
        { type: "InteractiveHero", props: { title: "Simple. Powerful. Effective." } },
        { type: "TwoColumn", props: { heading: "Why Choose Us" } },
        { type: "NewsletterSection", props: {} },
      ],
    },
  },
  {
    id: "portfolio-showcase",
    name: "Portfolio Showcase",
    description: "Visual portfolio with masonry grid",
    thumbnail: "https://via.placeholder.com/400x300?text=Portfolio",
    data: {
      content: [
        { type: "FeaturedMedia", props: { title: "Our Work" } },
      ],
    },
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Product announcement page",
    thumbnail: "https://via.placeholder.com/400x300?text=Launch",
    data: {
      content: [
        { type: "InteractiveHero", props: { title: "Introducing Our New Product" } },
        { type: "FShape", props: { heroTitle: "Features Overview" } },
        { type: "Button", props: { text: "Pre-order Now" } },
      ],
    },
  },
  {
    id: "content-heavy",
    name: "Content Hub",
    description: "Blog or content-focused layout",
    thumbnail: "https://via.placeholder.com/400x300?text=Content+Hub",
    data: {
      content: [
        { type: "Text", props: { text: "<h1>Latest Articles</h1>" } },
        { type: "ZShape", props: {} },
        { type: "CardGrid", props: { columns: 4 } },
      ],
    },
  },
  {
    id: "promo-page",
    name: "Promotional Page",
    description: "Sale or offer promotion layout",
    thumbnail: "https://via.placeholder.com/400x300?text=Promo",
    data: {
      content: [
        { type: "OfferBanner", props: {} },
        { type: "KarigaiProductGrid", props: { title: "Sale Items", showFeatured: true } },
        { type: "Spacer", props: { height: "md" } },
      ],
    },
  },
  {
    id: "feature-comparison",
    name: "Feature Comparison",
    description: "Compare features side-by-side",
    thumbnail: "https://via.placeholder.com/400x300?text=Comparison",
    data: {
      content: [
        { type: "Text", props: { text: "<h1>Compare Plans</h1>" } },
        { type: "SplitScreen", props: { leftTitle: "Basic", rightTitle: "Premium" } },
      ],
    },
  },
  {
    id: "testimonial-focus",
    name: "Testimonial Showcase",
    description: "Customer reviews and success stories",
    thumbnail: "https://via.placeholder.com/400x300?text=Testimonials",
    data: {
      content: [
        { type: "Text", props: { text: "<h1>Customer Success Stories</h1>" } },
        { type: "TestimonialSection", props: { 
          testimonials: [
            { name: "Customer 1", role: "User", content: "Amazing experience!", rating: 5 },
            { name: "Customer 2", role: "Buyer", content: "Best purchase ever!", rating: 5 },
          ]
        } },
        { type: "BrandShowcase", props: {} },
      ],
    },
  },
  {
    id: "multi-section",
    name: "Multi-Section Page",
    description: "Comprehensive page with multiple sections",
    thumbnail: "https://via.placeholder.com/400x300?text=Multi+Section",
    data: {
      content: [
        { type: "Hero", props: {} },
        { type: "FeatureSection", props: {} },
        { type: "Asymmetrical", props: {} },
        { type: "TestimonialSection", props: { 
          testimonials: [
            { name: "Happy Customer", role: "Client", content: "Excellent service and quality!", rating: 5 },
          ]
        } },
        { type: "NewsletterSection", props: {} },
      ],
    },
  },
  {
    id: "visual-storytelling",
    name: "Visual Storytelling",
    description: "Image-rich narrative layout",
    thumbnail: "https://via.placeholder.com/400x300?text=Visual+Story",
    data: {
      content: [
        { type: "FeaturedMedia", props: { title: "Our Journey" } },
        { type: "ZShape", props: {} },
      ],
    },
  },
];

export default function TemplateDialog({ 
  onClose, 
  onSelect 
}: { 
  onClose: () => void; 
  onSelect: (template: Template) => void;
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">Choose a Template</h2>
            <p className="text-muted-foreground mt-1">Select a pre-made layout to get started quickly</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group cursor-pointer rounded-lg border-2 transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedTemplate) {
                onSelect(selectedTemplate);
                onClose();
              }
            }}
            disabled={!selectedTemplate}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Insert Template
          </button>
        </div>
      </div>
    </div>
  );
}
