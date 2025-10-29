import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface BrandShowcaseProps {
  title?: string;
  subtitle?: string;
  brands: {
    name: string;
    logo: string;
    href?: string;
  }[];
  columns?: 3 | 4 | 5 | 6;
  grayscale?: boolean;
}

export const BrandShowcase: ComponentConfig<BrandShowcaseProps> = {
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
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
        { label: "6 Columns", value: 6 },
      ],
    },
    grayscale: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    brands: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        logo: ImageSelector,
        href: { type: "text" },
      },
      defaultItemProps: {
        name: "Brand Name",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
      getItemSummary: (item) => item.name || "Brand",
    },
  },
  defaultProps: {
    title: "Trusted by Leading Brands",
    subtitle: "Join thousands of satisfied customers",
    columns: 5,
    grayscale: true,
    brands: [
      {
        name: "Brand 1",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
      {
        name: "Brand 2",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
      {
        name: "Brand 3",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
      {
        name: "Brand 4",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
      {
        name: "Brand 5",
        logo: "https://via.placeholder.com/200x100",
        href: "",
      },
    ],
  },
  render: ({ title, subtitle, brands, columns, grayscale, puck }) => {
    const columnClasses = {
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
      5: "grid-cols-3 md:grid-cols-5",
      6: "grid-cols-3 md:grid-cols-6",
    };

    return (
      <section className="py-16 bg-gray-50">
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

          <div className={cn("grid gap-8 items-center", columnClasses[columns || 5])}>
            {brands.map((brand, index) => {
              const brandElement = (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-center p-4 transition-all duration-300",
                    grayscale && "grayscale hover:grayscale-0",
                    brand.href && !puck?.isEditing && "cursor-pointer hover:scale-105"
                  )}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              );

              if (brand.href && !puck?.isEditing) {
                return (
                  <a
                    key={index}
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brandElement}
                  </a>
                );
              }

              return brandElement;
            })}
          </div>
        </div>
      </section>
    );
  },
};
