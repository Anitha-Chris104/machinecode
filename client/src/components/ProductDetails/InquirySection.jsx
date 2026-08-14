import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import InquiryForm from "./InquiryForm";

const InquirySection = ({ product }) => {
  return (
    <section className="bg-white py-20" id="inquiry">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Need More Information?
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-800">
            Request a Quote
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our experts will contact you with pricing, technical details, and
            the best machine recommendation for your business.
          </p>

          {/* Brochure Card */}
          <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-8">
            <FileText className="mb-5 text-orange-500" size={45} />

            <h3 className="text-2xl font-semibold">Product Brochure</h3>

            <p className="mt-3 text-gray-600">
              Download the complete PDF brochure with specifications, dimensions
              and technical information.
            </p>

            <a
              href={product.brochure}
              download
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              <Download size={18} />
              Download PDF
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-slate-50 p-8 shadow-lg"
        >
          <InquiryForm product={product} />
        </motion.div>
      </div>
    </section>
  );
};

export default InquirySection;
