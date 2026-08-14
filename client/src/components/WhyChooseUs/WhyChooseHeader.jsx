import { motion } from "framer-motion";
import { fadeDown, fadeUp } from "../../animations/motionVariants";

const WhyChooseHeader = () => {
  return (
    <div className="text-center max-w-5xl mx-auto">
      {/* Badge */}
      <motion.div
        variants={fadeDown}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-orange-500/40 bg-white/5 backdrop-blur-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>

          <span className="uppercase tracking-[5px] text-sm text-white font-medium">
            WHY CHOOSE US
          </span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="mt-6 font-black leading-none tracking-tight text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
          Why Industries Choose
          <span className="text-orange-700"> Machine code</span>
        </h2>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-4 text-gray-300 text-sm lg:text-base leading-7 max-w-3xl mx-auto"
      >
        Trusted by leading companies for quality, innovation, reliability and
        long-term industrial partnerships.
      </motion.p>
    </div>
  );
};

export default WhyChooseHeader;
