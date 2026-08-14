import { motion } from "framer-motion";
import { whyChooseContact } from "../../data/whyChooseContact";

const WhyChooseContact = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      {/* Background Glow */}
      <div className="absolute -top-32 left-0 h-80 w-80 rounded-full bg-[#C2441C]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#852E47]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-[#C2441C]">
            WHY PARTNER WITH US
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#0D244D] md:text-5xl">
            Engineering Excellence You Can Trust
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            From consultation to installation, we focus on delivering reliable
            machinery, expert guidance, and long-term support for every
            customer.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseContact.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {/* Hover Glow */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-70" />

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#852E47] to-[#C2441C] shadow-lg">
                  <Icon
                    className="text-white transition duration-500 group-hover:rotate-12 group-hover:scale-110"
                    size={30}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-[#0D244D]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {item.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-[#852E47] to-[#C2441C] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseContact;
