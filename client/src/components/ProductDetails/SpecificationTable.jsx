import { motion } from "framer-motion";

const SpecificationTable = ({ product }) => {
  const specifications = product?.specifications || {};

  const specificationEntries = Object.entries(specifications);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Technical Specifications
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-800 md:text-4xl">
            Machine Specifications
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
            Explore the technical specifications of this industrial machine,
            designed to deliver superior performance, efficiency, and
            durability.
          </p>
        </motion.div>

        {/* No Specifications */}
        {specificationEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center"
          >
            <p className="text-gray-500">
              Technical specifications are currently unavailable.
            </p>
          </motion.div>
        ) : (
          /* Specification Cards */
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specificationEntries.map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-md
                  transition-all
                  hover:border-orange-500
                  hover:shadow-xl
                "
              >
                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                  {key}
                </p>

                <h3 className="mt-3 break-words text-2xl font-bold text-slate-800">
                  {value}
                </h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecificationTable;
