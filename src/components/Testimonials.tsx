import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    id: 1,
    name: 'Priya M.',
    location: 'Chennai, TN',
    text: "I use Karigai's lavender soap daily and my skin has never felt better. It's gentle, moisturizing, and the natural fragrance is so calming after a long day.",
    rating: 5,
    product: 'Lavender Dream Soap'
  },
  {
    id: 2,
    name: 'Raj S.',
    location: 'Bangalore, KA',
    text: "The quality of these handmade soaps is outstanding. My skin used to be very dry but after switching to Karigai's natural soaps, the difference is remarkable.",
    rating: 5,
    product: 'Honey Oatmeal Soap'
  },
  {
    id: 3,
    name: 'Anjali K.',
    location: 'Mumbai, MH',
    text: "I appreciate the natural ingredients and ethical manufacturing. The turmeric soap has helped clear my skin, and I've received so many compliments!",
    rating: 5,
    product: 'Turmeric Glow Soap'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f9f8f6] to-[#f5f4f2]">
      <div className="konipai-container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Badge className="mb-4 bg-[#219898]/10 text-[#219898] hover:bg-[#219898]/20">Testimonials</Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#333] to-[#555] bg-clip-text text-transparent">What Our Customers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#219898]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#219898]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < testimonial.rating ? 'fill-[#219898] text-[#219898]' : 'text-gray-200'} 
                    />
                  ))}
                </div>
                
                <div className="mb-4 text-gray-400">
                  <Quote size={24} className="mb-2 text-[#219898]/30" />
                </div>
                
                <p className="mb-6 text-gray-700 relative">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block px-3 py-1 bg-[#219898]/5 text-[#219898] text-xs rounded-full">
                      {testimonial.product}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
