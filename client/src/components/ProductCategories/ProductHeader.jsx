import { motion } from "framer-motion";

const ProductHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center max-w-5xl mx-auto"
    >
      {/* Badge */}

      <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/40 bg-white/5 backdrop-blur-md px-5 py-2">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>

        <span className="uppercase tracking-[3px] text-xs sm:text-sm text-white">
          Our Product Categories
        </span>
      </div>

      {/* Heading */}

      <h2 className="mt-8 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white">
        Advanced Machinery
        <br />
        for <span className="text-orange-500">Every Industry</span>
      </h2>

      {/* Orange Divider */}

      <div className="w-20 h-1 rounded-full bg-orange-500 mx-auto mt-6"></div>

      {/* Description */}

      <p className="mt-8 text-gray-300 text-base sm:text-lg leading-8 max-w-3xl mx-auto">
        From food processing to factory automation and hotel equipment, we
        deliver reliable and high-performance machinery for your growing
        business.
      </p>
    </motion.div>
  );
};

export default ProductHeader;
