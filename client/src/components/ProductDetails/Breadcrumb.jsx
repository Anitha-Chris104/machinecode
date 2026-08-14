import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb = ({ product }) => {
  return (
    <section className="bg-slate-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition"
          >
            <Home size={16} />
            Home
          </Link>

          <ChevronRight size={16} className="text-gray-400" />

          <Link
            to="/products"
            className="text-gray-500 hover:text-orange-500 transition"
          >
            Products
          </Link>

          <ChevronRight size={16} className="text-gray-400" />

          <span className="font-semibold text-orange-500">{product.name}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Breadcrumb;
