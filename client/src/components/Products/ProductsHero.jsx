import { motion } from "framer-motion";
import { ChevronRight, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F3D] via-[#12345A] to-[#0A1F3D]  lg:py-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/30"
        >
          <PackageSearch className="h-10 w-10 text-orange-500" />
        </motion.div>

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-2 text-sm text-gray-300"
        >
          <Link to="/" className="transition hover:text-orange-500">
            Home
          </Link>

          <ChevronRight size={16} />

          <span className="text-orange-500">Products</span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Our Industrial
          <span className="text-orange-500"> Products</span>
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-3xl text-lg leading-8 text-gray-300"
        >
          Explore our premium range of industrial machinery engineered for
          durability, efficiency and outstanding performance across food
          processing, material handling and manufacturing industries.
        </motion.p>
      </div>
    </section>
  );
};

export default ProductsHero;
