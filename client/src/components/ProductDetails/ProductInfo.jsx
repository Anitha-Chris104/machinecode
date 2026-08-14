import { motion } from "framer-motion";
import { ArrowRight, Download, Phone, CheckCircle2 } from "lucide-react";

const ProductInfo = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center"
    >
      {/* Category */}
      <span className="inline-flex w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
        {product.category}
      </span>

      {/* Product Name */}
      <h1 className="mt-5 text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {/* Orange Divider */}
      <div className="mt-5 h-1 w-24 rounded-full bg-orange-500" />

      {/* Description */}
      <p className="mt-6 text-lg leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Highlights */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-orange-500" size={20} />
          <span className="text-gray-700">
            Heavy-duty industrial construction
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-orange-500" size={20} />
          <span className="text-gray-700">Energy-efficient operation</span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-orange-500" size={20} />
          <span className="text-gray-700">
            Easy maintenance & long service life
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-orange-500" size={20} />
          <span className="text-gray-700">
            Suitable for multiple industries
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap gap-4">
        {/* Inquiry */}
        <button
          className="
            flex items-center gap-2
            rounded-full
            bg-orange-500
            px-8 py-4
            font-semibold
            text-white
            transition
            hover:bg-orange-600
          "
        >
          <Phone size={18} />
          Request Quote
        </button>

        {/* Brochure */}
        {product.brochure ? (
          <a
            href={product.brochure}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="
      flex items-center gap-2
      rounded-full
      border-2 border-slate-800
      px-8 py-4
      font-semibold
      text-slate-800
      transition
      hover:bg-slate-800
      hover:text-white
    "
          >
            <Download size={18} />
            Download Brochure
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="
      flex cursor-not-allowed items-center gap-2
      rounded-full
      border-2 border-gray-300
      px-8 py-4
      font-semibold
      text-gray-400
    "
          >
            <Download size={18} />
            Brochure Unavailable
          </button>
        )}
      </div>

      {/* Contact Box */}
      <div className="mt-10 rounded-2xl border border-orange-100 bg-orange-50 p-6">
        <h3 className="text-lg font-semibold text-slate-800">
          Need Help Choosing the Right Machine?
        </h3>

        <p className="mt-2 text-gray-600">
          Our experts can recommend the best solution based on your production
          requirements.
        </p>

        <button className="mt-5 inline-flex items-center gap-2 font-semibold text-orange-600 hover:gap-3 transition-all">
          Contact Our Experts
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
