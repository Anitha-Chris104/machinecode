import { motion } from "framer-motion";
import { industries } from "./industriesData";
import IndustryOverviewCard from "./IndustryOverviewCard";
import { containerVariants } from "../../animations/motionVariants";

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}

        <div className="grid lg:grid-cols-2 gap-15 items-start">
          <div>
            <p className="uppercase tracking-[4px] text-orange-600 font-semibold text-sm">
              Industrial Capability
            </p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mt-3 text-4xl font-bold text-[#14315C] leading-tight">
                Built For Demanding
                <br />
                Production Environments.
              </h2>
            </motion.div>
          </div>

          <div>
            <p className="text-gray-600 text-lg leading-9 mt-5">
              We design and manufacture durable machinery that helps operators
              improve throughput, reduce downtime, and standardize quality
              across mission-critical facilities.
            </p>
          </div>
        </div>

        {/* Cards */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-16"
        >
          {industries.map((industry) => (
            <IndustryOverviewCard key={industry.title} industry={industry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
