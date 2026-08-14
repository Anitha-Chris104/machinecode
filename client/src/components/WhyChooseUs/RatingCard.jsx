import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeRight } from "../../animations/motionVariants";

const RatingCard = ({ company, rating, description, color }) => {
  return (
    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="
      group
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-orange-500/40
      hover:bg-white/10
      "
    >
      {/* Company */}

      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full ${color}`} />

        <h3 className="text-white font-semibold text-lg">{company}</h3>
      </div>

      {/* Stars */}

      <div className="flex items-center gap-1 mt-5 text-orange-400">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      {/* Rating */}

      <h2 className="mt-4 text-4xl font-extrabold text-white">{rating}</h2>

      {/* Description */}

      <p className="mt-3 text-gray-300 leading-7">{description}</p>
    </motion.div>
  );
};

export default RatingCard;
