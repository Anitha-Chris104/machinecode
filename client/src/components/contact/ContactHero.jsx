import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/contact/w1.png";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Industrial Factory"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0D244D]/75" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D244D]/90 via-[#0D244D]/60 to-transparent" />
      </div>

      {/* Blueprint Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Blur */}
      <div className="absolute -top-24 right-10 w-80 h-80 rounded-full bg-[#C2441C]/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#852E47]/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium tracking-wide text-orange-300">
            CONTACT US
          </span>

          {/* Breadcrumb */}
          <div className="mt-12 flex items-center gap-3 text-sm text-gray-300">
            <Link to="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>

            <span>/</span>

            <span className="text-orange-400 font-medium">Contact Us</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Let's Build
            <span className="block text-orange-400">
              Something Great Together
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
            Looking for reliable industrial machinery or custom manufacturing
            solutions? Our experts are ready to help you choose the perfect
            solution for your business.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="#contact-form"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C2441C] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#AA542B]"
            >
              Send Inquiry
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0D244D]"
            >
              Explore Products
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
