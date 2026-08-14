import { motion } from "framer-motion";
import ProductIndustryCard from "./ProductIndustryCard";

const RecommendedIndustries = ({ product }) => {
  const industries = product?.industries || [];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[4px] text-orange-500">
            Recommended Industries
          </p>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Perfect for Multiple Industries
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Our machine is trusted across various industries for its
            reliability, efficiency, and consistent performance.
          </p>
        </motion.div>

        {/* Industry Cards */}
        {industries.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <ProductIndustryCard
                key={`${industry.title}-${index}`}
                industry={industry}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">
              Recommended industries are currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedIndustries;
