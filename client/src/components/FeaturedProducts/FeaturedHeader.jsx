import { motion } from "framer-motion";

const FeaturedHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center max-w-4xl mx-auto"
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>

        <span className="uppercase tracking-[3px] text-orange-500 text-sm font-medium">
          Featured Products
        </span>
      </div>

      <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        Our Most
        <span className="text-orange-500"> Popular Machines</span>
      </h2>

      <div className="w-24 h-1 bg-orange-500 rounded-full mx-auto mt-6"></div>

      <p className="mt-8 text-gray-300 text-lg leading-8">
        Discover our top-performing industrial machinery designed for maximum
        productivity, durability and precision engineering.
      </p>
    </motion.div>
  );
};

export default FeaturedHeader;
