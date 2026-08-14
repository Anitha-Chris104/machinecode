import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeUp } from "../../animations/motionVariants";

const ProductCard = ({ icon: Icon, title, image, products }) => {
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
        rounded-[30px]
        border
        border-white/10
        bg-[#0B2342]
        p-8
        transition-all
        duration-500
        hover:border-orange-500/40
        hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]
      "
    >
      {/* Floating Icon */}
      <div
        className="
    absolute
    left-1/2
    -translate-x-1/2
    top-2
    w-16
    h-16
    rounded-full
    bg-gradient-to-br
    from-orange-500
    to-orange-700
    flex
    items-center
    justify-center
    shadow-[0_0_35px_rgba(249,115,22,0.45)]
    before:absolute
    before:w-20
    before:h-20
    before:rounded-full
    before:bg-orange-500/20
    before:blur-xl
    before:-z-10
  "
      >
        <Icon size={30} className="text-white" />
      </div>
      {/* Machine Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="m-5 rounded-[20px] overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="
            w-full
            h-52
            object-fill
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </motion.div>

      {/* Title */}
      <h3 className="m-3 text-2xl font-bold text-white text-center">{title}</h3>

      {/* Orange Divider */}
      <div className="w-16 h-1 rounded-full bg-orange-500 mx-auto mt-5 mb-7"></div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-orange-500 shrink-0" />

            <span className="text-gray-300">{item}</span>
          </div>
        ))}
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
        Explore Products
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

export default ProductCard;
