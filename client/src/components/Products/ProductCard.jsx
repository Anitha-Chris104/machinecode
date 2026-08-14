import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({
  slug,
  name,
  images,
  category,
  shortDescription,
  features = [],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="
        group
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-gray-200
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <img
          src={images?.[0]}
          alt={name}
          className="
            h-64
            w-full
            object-cover
            p-6
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#0D244D] px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#0F2D52]">{name}</h3>

        <p className="mt-4 text-gray-600 leading-7">{shortDescription}</p>

        <div className="mt-5 space-y-2">
          {features.slice(0, 3).map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <span className="h-2 w-2 rounded-full bg-[#C2441C]" />
              {feature.title}
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to={`/products/${slug}`}
            className="flex-1 rounded-xl bg-[#C2441C] py-3 text-center font-semibold text-white transition hover:bg-[#AA542B]"
          >
            View Details
          </Link>

          <Link
            to="/contact"
            className="rounded-xl border border-[#C2441C] px-5 py-3 font-semibold text-[#C2441C] transition hover:bg-[#C2441C] hover:text-white"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
