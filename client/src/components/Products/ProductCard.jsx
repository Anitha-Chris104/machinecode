import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://placehold.co/600x400/f1f5f9/475569?text=Product+Image";

const ProductCard = ({
  slug,
  name,
  images = [],
  category,
  shortDescription,
  features = [],
}) => {
  const [imageSrc, setImageSrc] = useState(images?.[0] || FALLBACK_IMAGE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <img
          src={imageSrc}
          alt={name || "Product"}
          loading="lazy"
          onError={() => {
            if (imageSrc !== FALLBACK_IMAGE) {
              setImageSrc(FALLBACK_IMAGE);
            }
          }}
          className="h-64 w-full object-cover p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-[#0D244D] px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {category || "Equipment"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#0F2D52]">
          {name || "Unnamed Product"}
        </h3>

        <p className="mt-4 leading-7 text-gray-600">
          {shortDescription || "Contact us for more product information."}
        </p>

        {features.length > 0 && (
          <div className="mt-5 space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={feature.title || index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="h-2 w-2 rounded-full bg-[#C2441C]" />
                {feature.title}
              </div>
            ))}
          </div>
        )}

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
