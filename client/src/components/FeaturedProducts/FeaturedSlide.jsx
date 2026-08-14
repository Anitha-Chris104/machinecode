import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import ProductFeatures from "./ProductFeatures";
import { Link } from "react-router-dom";

const FeaturedSlide = ({ title, description, image, features, slug }) => {
  return (
    <div
      className="
        rounded-[36px]
        bg-white
        border
        border-gray-200
        shadow-xl
        overflow-hidden
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          items-center
          px-8
          py-10
          lg:px-16
          lg:py-16
        "
      >
        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center"
        >
          {/* Orange Glow */}

          <div
            className="
              absolute
              w-80
              h-80
              rounded-full
              bg-orange-500/10
              blur-3xl
            "
          />

          {/* Machine Image */}

          <motion.img
            whileHover={{
              scale: 1.06,
              rotate: -1,
            }}
            transition={{ duration: 0.4 }}
            src={image}
            alt={title}
            className="
              relative
              w-full
              max-w-md
              lg:max-w-lg
              object-contain
              drop-shadow-2xl
            "
          />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}

          <span
            className="
              inline-flex
              px-5
              py-2
              rounded-full
              bg-orange-100
              text-orange-600
              font-semibold
              text-sm
            "
          >
            Featured Product
          </span>

          {/* Title */}

          <h2
            className="
              mt-6
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-bold
              text-[#0F2D52]
            "
          >
            {title}
          </h2>

          {/* Divider */}

          <div
            className="
              w-24
              h-1
              rounded-full
              bg-orange-500
              mt-5
            "
          />

          {/* Description */}

          <p
            className="
              mt-8
              text-gray-600
              leading-8
              text-lg
            "
          >
            {description}
          </p>

          {/* Features */}

          <ProductFeatures features={features} />

          {/* Buttons */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-4
            "
          >
            <Link
              to={`/products/${slug}#inquiry`}
              className="
    flex
    items-center
    gap-3
    rounded-full
    bg-orange-500
    hover:bg-orange-600
    text-white
    px-8
    py-4
    font-semibold
    transition-all
    duration-300
  "
            >
              <PhoneCall size={18} />
              Request Quote
            </Link>

            <button
              className="
                flex
                items-center
                gap-3
                rounded-full
                border-2
                border-[#0F2D52]
                text-[#0F2D52]
                hover:bg-[#0F2D52]
                hover:text-white
                px-8
                py-4
                font-semibold
                transition-all
                duration-300
              "
            >
              <Link
                to={`/products/${slug}`}
                className="flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-white font-semibold hover:bg-orange-600 transition"
              >
                View Details
                <ArrowRight size={18} />
              </Link>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSlide;
