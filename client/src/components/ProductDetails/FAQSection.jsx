import { motion } from "framer-motion";
import FAQItem from "./FAQItem";

const FAQSection = ({ product }) => {
  const faqs = product?.faq || [];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Got Questions?
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
            Here are answers to some of the most common questions about this
            machine.
          </p>
        </motion.div>

        {/* FAQ List */}
        {faqs.length > 0 ? (
          <div className="mt-14 space-y-5">
            {faqs.map((faq, index) => (
              <FAQItem key={`${faq.question}-${index}`} faq={faq} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-500">
              Frequently asked questions are currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
