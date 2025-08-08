import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Story</h1>
      
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-lg mb-6">
          Karigai was founded with a simple mission: to create beautiful, nourishing handmade soaps 
          that don't compromise on quality or sustainability.
        </p>
        <p className="text-lg mb-6">
          Our journey began when we couldn't find natural soaps that were both 
          gentle on sensitive skin and environmentally friendly. After months of research 
          and experimentation with traditional recipes, Karigai was born.
        </p>
        <p className="text-lg">
          Today, we continue to craft each soap with care using natural oils, butters, and botanical extracts. 
          We believe that what you put on your skin matters, and we're 
          proud to be part of your natural skincare journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Handcrafted with Care</h2>
          <p className="mb-4">
            Each Karigai soap is made by skilled artisans who take pride in their craft. 
            We work in small batches to ensure quality and attention to detail at every step.
          </p>
          <p>
            From ingredient selection to the final curing process, we pay attention to every detail to 
            create soaps that are not only beautiful but gentle and nourishing for your skin.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col justify-center md:order-1">
          <h2 className="text-2xl font-bold mb-4">Natural by Design</h2>
          <p className="mb-4">
            Natural ingredients aren't just a buzzword for us—they're at the core of everything we do. 
            We source organic oils and botanical extracts from certified suppliers and use traditional 
            cold-process methods to preserve the natural goodness.
          </p>
          <p>
            Our packaging is minimal, plastic-free, and made from biodegradable materials, because we believe 
            responsibility extends beyond the product itself.
          </p>
        </div>
      </div>
      
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
        <p className="mb-6">
          We're passionate about natural skincare, and we're excited to have you along for the journey. 
          Every purchase supports our mission of creating beautiful, natural soaps 
          that nourish your skin and respect the environment.
        </p>
        <Link to="/shop" className="konipai-btn">
          Shop Our Soaps
        </Link>
      </div>
    </div>
  );
};

export default About;
