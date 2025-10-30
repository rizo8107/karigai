import { ComponentConfig } from "@measured/puck";
import { cn } from "@/lib/utils";
import { ImageSelector } from "@/puck/fields/ImageSelector";

export interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: {
    name: string;
    role?: string;
    company?: string;
    content: string;
    avatar?: string;
    rating?: number;
  }[];
  columns?: 1 | 2 | 3;
  showRating?: boolean;
}

export const TestimonialSection: ComponentConfig<TestimonialSectionProps> = {
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
        { label: "1 Column", value: 1 },
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
      ],
    },
    showRating: {
      type: "radio",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    testimonials: {
      type: "array",
      arrayFields: {
        name: { type: "text" },
        role: { type: "text" },
        company: { type: "text" },
        content: { type: "textarea" },
        avatar: ImageSelector,
        rating: { type: "number", min: 1, max: 5 },
      },
      defaultItemProps: {
        name: "Customer Name",
        role: "Customer",
        company: "",
        content: "This is an amazing product! I highly recommend it.",
        avatar: "https://via.placeholder.com/64x64",
        rating: 5,
      },
      getItemSummary: (item) => item.name || "Testimonial",
    },
  },
  defaultProps: {
    title: "What Our Customers Say",
    subtitle: "Don't just take our word for it - hear from our satisfied customers",
    columns: 3,
    showRating: true,
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Marketing Manager",
        company: "Tech Corp",
        content: "Excellent service and quality products. Will definitely order again!",
        avatar: "https://via.placeholder.com/64x64",
        rating: 5,
      },
      {
        name: "Mike Chen",
        role: "Designer",
        company: "Creative Studio",
        content: "Fast delivery and great customer support. Highly recommended!",
        avatar: "https://via.placeholder.com/64x64",
        rating: 5,
      },
      {
        name: "Emily Davis",
        role: "Entrepreneur",
        company: "",
        content: "Amazing products at great prices. The quality exceeded my expectations.",
        avatar: "https://via.placeholder.com/64x64",
        rating: 5,
      },
    ],
  },
  render: ({ title, subtitle, testimonials, columns, showRating }) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "text-lg",
            index < rating ? "text-yellow-400" : "text-gray-300"
          )}
        >
          ★
        </span>
      ));
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

          <div className={cn("grid gap-8", columnClasses[columns || 3])}>
            {(testimonials || []).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border"
              >
                {showRating && testimonial.rating && (
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                )}
                
                <blockquote className="text-gray-700 mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    {(testimonial.role || testimonial.company) && (
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && " at "}
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
