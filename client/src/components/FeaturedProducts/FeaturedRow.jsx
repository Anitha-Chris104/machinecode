import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductFeatures from "./ProductFeatures";
import { fadeLeft, fadeRight } from "../../animations/motionVariants";

const FeaturedRow = ({
  title,
  description,
  image,
  features,
  icon: Icon,
  reverse,
}) => {
  return (
    <div
      className={`
        grid
        lg:grid-cols-2
        gap-14
        lg:gap-20
        items-center
        ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
      `}
    >
      {/* Image */}

      <motion.div
        variants={reverse ? fadeRight : fadeLeft}
        className="relative flex justify-center"
      >
        <div className="absolute w-72 h-72 bg-orange-500/10 blur-3xl rounded-full"></div>

        <img
          src={image}
          alt={title}
          className="
            relative
            h-[260px]
            sm:h-[320px]
            lg:h-[420px]
            object-contain
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </motion.div>

      {/* Content */}

      <motion.div variants={reverse ? fadeLeft : fadeRight}>
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
            <Icon size={28} className="text-white" />
          </div>

          <div className="w-16 h-[2px] bg-orange-500"></div>
        </div>

        <h2 className="text-3xl lg:text-5xl font-bold text-white">{title}</h2>

        <p className="mt-6 text-gray-300 leading-8">{description}</p>

        <ProductFeatures features={features} />

        <button
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-orange-500
            px-7
            py-4
            text-white
            font-semibold
            transition-all
            duration-300
            hover:bg-orange-600
            hover:gap-5
          "
        >
          View Details
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
};

export default FeaturedRow;
