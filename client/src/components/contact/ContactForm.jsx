import { Send } from "lucide-react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-gray-200 bg-white p-8 lg:p-10 shadow-xl"
    >
      <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#C2441C]">
        SEND INQUIRY
      </span>

      <h2 className="mt-5 text-4xl font-bold text-[#0D244D]">
        Let's Discuss Your Project
      </h2>

      <p className="mt-4 text-gray-600 leading-8">
        Fill out the form below and our experts will get back to you within one
        business day.
      </p>

      <form className="mt-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl border border-gray-200 p-4 outline-none focus:border-[#C2441C]"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="rounded-xl border border-gray-200 p-4 outline-none focus:border-[#C2441C]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Phone Number"
            className="rounded-xl border border-gray-200 p-4 outline-none focus:border-[#C2441C]"
          />

          <input
            type="text"
            placeholder="Company Name"
            className="rounded-xl border border-gray-200 p-4 outline-none focus:border-[#C2441C]"
          />
        </div>

        <select className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#C2441C]">
          <option>Select Industry</option>
          <option>Food Processing</option>
          <option>Hotel Equipment</option>
          <option>Chemical</option>
          <option>Pharmaceutical</option>
          <option>Dairy</option>
        </select>

        <textarea
          rows="6"
          placeholder="Tell us about your requirements..."
          className="w-full rounded-xl border border-gray-200 p-4 outline-none resize-none focus:border-[#C2441C]"
        />

        <button className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#852E47] to-[#C2441C] px-8 py-4 font-semibold text-white transition hover:shadow-xl hover:-translate-y-1">
          Send Inquiry
          <Send
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
