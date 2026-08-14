import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import IndustriesSection from "../components/Industries/IndustriesSection";
import ProductCategories from "../components/ProductCategories/ProductCategories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";
import ContactCTA from "../components/contact/ContactCTA";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Machine Code" />

        <meta
          property="og:description"
          content="Industrial Machinery Manufacturer"
        />

        <meta property="og:image" content="/og-image.jpg" />

        <meta property="og:type" content="website" />
      </Helmet>
      <Helmet>
        <title>Machine Code | Industrial Machinery Manufacturer</title>

        <meta
          name="description"
          content="Leading manufacturer of industrial machinery, ribbon blenders, conveyors, food processing machines, hotel equipment, and custom industrial solutions."
        />
      </Helmet>
      <Hero />
      <About />
      <WhyChooseUs />
      <IndustriesSection />
      <ProductCategories />
      <FeaturedProducts />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
};

export default Home;
