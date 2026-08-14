import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/motionVariants";
import { stats } from "../../data/stats";
import StatItem from "./StatItem";

const StatsSection = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-0"
    >
      {stats.map((item, index) => (
        <StatItem key={item.id} {...item} isLast={index === stats.length - 1} />
      ))}
    </motion.div>
  );
};

export default StatsSection;
