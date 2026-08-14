import { motion } from "framer-motion";
import { UtensilsCrossed, Pill, FlaskConical, ChefHat } from "lucide-react";

const iconMap = {
  UtensilsCrossed,
  Pill,
  FlaskConical,
  ChefHat,
};

const IndustryOverviewCard = ({ industry }) => {
  const Icon = iconMap[industry.icon];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-slate-200 bg-slate-100 p-7 transition-all duration-300 hover:border-orange-500/30 hover:shadow-xl"
    >
      {/* Orange line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-6 h-1 rounded-full bg-orange-600"
      />

      <div className="flex items-start gap-5">
        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.1,
          }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          {Icon && (
            <Icon
              size={34}
              strokeWidth={1.8}
              className="text-orange-600 transition-transform group-hover:scale-110"
            />
          )}
        </motion.div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-semibold leading-7 text-[#17345D]">
            {industry.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {industry.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IndustryOverviewCard;
