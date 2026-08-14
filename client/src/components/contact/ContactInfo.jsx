import { motion } from "framer-motion";
import ContactCards from "../contact/ContactCards";
import { contactInfo } from "../../data/contactData";

const ContactInfo = () => {
  return (
    <section className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-[#C2441C]">
            GET IN TOUCH
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#0D244D]">
            We're Here To Help
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Whether you need industrial machinery, technical guidance, or a
            custom manufacturing solution, our team is ready to assist you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactInfo.map((item) => (
            <ContactCards key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
