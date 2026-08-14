import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Pill,
  FlaskConical,
  ChefHat,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  UtensilsCrossed,
  Pill,
  FlaskConical,
  ChefHat,
};

const ProductIndustryCard = ({ industry }) => {
  const Icon = iconMap[industry?.icon];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        group
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-md
        transition-all
        duration-300
        hover:border-orange-500
        hover:shadow-xl
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-orange-50
          text-orange-500
          transition-all
          duration-300
          group-hover:bg-orange-500
          group-hover:text-white
        "
      >
        {Icon && <Icon size={28} strokeWidth={1.8} />}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-2xl font-bold text-slate-800">
        {industry?.title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-7 text-gray-600">{industry?.description}</p>

      {/* Learn More */}
      <button
        type="button"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          font-semibold
          text-orange-500
          transition-all
          group-hover:gap-3
        "
      >
        Learn More
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

export default ProductIndustryCard;
