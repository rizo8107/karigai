import { ComponentConfig } from "@measured/puck";
import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface CategorySectionProps {
  title?: string;
  subtitle?: string;
  categories: {
    name: string;
    image: string;
    href: string;
    description?: string;
  }[];
  columns?: 2 | 3 | 4;
  showDescription?: boolean;
}

export const CategorySection: ComponentConfig<CategorySectionProps> = {
  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },
    subtitle: {
      type: "textarea",
      label: "Section Subtitle",
    },
    columns: {
      type: "select",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    showDescription: {
      type: "radio",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    categories: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        image: ImageSelector,
        href: { type: "text" },
        description: { type: "textarea" },
      },
      defaultItemProps: {
        name: "Category Name",
        image: "https://via.placeholder.com/300x200",
        href: "/category",
        description: "Category description",
      },
      getItemSummary: (item) => item.name || "Category",
    },
  },
  defaultProps: {
    title: "Shop by Category",
    subtitle: "Discover our carefully curated collections",
    columns: 3,
    showDescription: true,
    categories: [
      {
        name: "Electronics",
        image: "https://via.placeholder.com/300x200",
        href: "/category/electronics",
        description: "Latest gadgets and electronics",
      },
      {
        name: "Fashion",
        image: "https://via.placeholder.com/300x200",
        href: "/category/fashion",
        description: "Trending fashion and accessories",
      },
      {
        name: "Home & Garden",
        image: "https://via.placeholder.com/300x200",
        href: "/category/home-garden",
        description: "Beautiful home and garden items",
      },
    ],
  },
  render: ({ title, subtitle, categories, columns, showDescription, puck }) => {
    const columnClasses = {
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className={cn("grid gap-8", columnClasses[columns || 3])}>
            {categories.map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => {
                  if (!puck?.isEditing && category.href) {
                    window.location.href = category.href;
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/3] mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {showDescription && category.description && (
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
