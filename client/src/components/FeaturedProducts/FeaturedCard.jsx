import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductFeatures from "./ProductFeatures";
import { fadeUp } from "../../animations/motionVariants";
import { Link } from "react-router-dom";

const FeaturedCard = ({
  title,
  description,
  image,
  badge,
  icon: Icon,
  features,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-gradient-to-b
      from-[#102746]
      to-[#08172D]
      p-7
      transition-all
      duration-500
      hover:border-orange-500/40
      hover:shadow-[0_20px_60px_rgba(249,115,22,.15)]
      flex
      flex-col
      "
    >
      {/* Badge */}

      <div
        className="
        absolute
        top-5
        right-5
        rounded-full
        bg-orange-500
        px-4
        py-1
        text-xs
        font-semibold
        text-white
        "
      >
        {badge}
      </div>

      {/* Icon */}

      <div
        className="
        w-14
        h-14
        rounded-full
        bg-orange-500/20
        border
        border-orange-500/30
        flex
        items-center
        justify-center
        "
      >
        <Icon size={28} className="text-orange-500" />
      </div>

      {/* Image */}

      <div className="flex justify-center mt-8">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={image}
          alt={title}
          className="
          h-56
          w-auto
          object-contain
          transition-all
          duration-500
          group-hover:scale-105
          "
        />
      </div>

      {/* Content */}

      <div className="flex-1">
        <h3
          className="
          text-white
          text-2xl
          font-bold
          mt-8
          "
        >
          {title}
        </h3>

        <p
          className="
          text-gray-300
          leading-7
          mt-4
          "
        >
          {description}
        </p>

        <ProductFeatures features={features} />
      </div>

      {/* Button */}

      <button
        className="
        mt-8
        inline-flex
        items-center
        gap-2
        text-orange-500
        font-semibold
        transition-all
        duration-300
        group-hover:gap-4
        "
      >
        View Details
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

export default FeaturedCard;
