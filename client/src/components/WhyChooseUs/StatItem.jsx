import { motion } from "framer-motion";
import { fadeLeft } from "../../animations/motionVariants";

const StatItem = ({ icon: Icon, number, title, description, isLast }) => {
  return (
    <motion.div variants={fadeLeft}>
      <div className="flex items-start py-3">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 shrink-0">
          <Icon size={48} strokeWidth={1.8} className="text-orange-500" />
        </div>

        {/* Vertical Divider */}
        <div className="mx-6 h-24 w-px bg-white/10"></div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-5xl font-bold text-orange-500">{number}</h3>

          <h4 className="mt-1 text-2xl font-semibold text-white">{title}</h4>

          <p className="mt-1 text-gray-400 leading-5">{description}</p>
        </div>
      </div>

      {!isLast && <div className="h-px bg-white/10"></div>}
    </motion.div>
  );
};

export default StatItem;
