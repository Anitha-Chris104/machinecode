import { motion } from "framer-motion";

import {
  ShieldCheck,
  Zap,
  Wrench,
  TrendingUp,
  Settings,
  Factory,
} from "lucide-react";

const icons = {
  shield: ShieldCheck,
  zap: Zap,
  wrench: Wrench,
  trending: TrendingUp,
  settings: Settings,
  factory: Factory,
};

const WhyChooseMachine = ({ product }) => {
  const features = product?.features || [];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Why Choose This Machine?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600">
            Designed with advanced engineering and premium materials to deliver
            reliable performance, maximum efficiency, and long-term durability.
          </p>
        </motion.div>

        {/* Cards */}
        {features.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = icons[feature.icon] || Settings;

              return (
                <motion.div
                  key={`${feature.title}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:border-orange-500 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition group-hover:bg-orange-500">
                    <Icon
                      className="text-orange-500 group-hover:text-white"
                      size={30}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-2xl font-semibold text-slate-800">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">
              Machine features are currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseMachine;
