import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motionVariants";

const companies = [
  "TATA",
  "ADANI",
  "JINDAL",
  "ITC",
  "GODREJ",
  "DANONE",
  "PEPSICO",
];

const CompanyLogos = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-16"
    >
      <div
        className="
        flex
        overflow-x-auto
        xl:grid
        xl:grid-cols-7
        gap-8
        scrollbar-hide
        "
      >
        {companies.map((company) => (
          <div
            key={company}
            className="
            min-w-[170px]
            xl:min-w-0
            flex
            justify-center
            items-center
            
            border-r
            border-white/10
            last:border-r-0
            "
          >
            <span className="text-white/80 font-bold text-2xl hover:text-orange-400 transition">
              {company}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompanyLogos;
