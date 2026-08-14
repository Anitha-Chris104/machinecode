import { motion } from "framer-motion";
import { PhoneCall, Download, MessageCircle, ArrowRight } from "lucide-react";

const PHONE_NUMBER = "+91 9876543210";

const FinalCTA = ({ product }) => {
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the ${product.name}. Please share more details.`,
  );

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-[#123B68] to-orange-600" />

      {/* Decorative Circles */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-orange-300 backdrop-blur">
            Let's Build Your Next Project
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Upgrade Your Production Line?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
            Get expert consultation, customized solutions, competitive pricing,
            and dedicated support for your industrial requirements.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {/* Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
            >
              <PhoneCall size={18} />
              Call Now
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            {/* Brochure */}
            <a
              href={product.brochure}
              download
              className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Machines Installed" },
              { value: "100+", label: "Happy Clients" },
              { value: "24/7", label: "Technical Support" },
              { value: "10+", label: "Years Experience" },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-3xl font-bold text-orange-400">
                  {item.value}
                </h3>
                <p className="mt-2 text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom Link */}
          <button
            onClick={() =>
              document
                .getElementById("inquiry")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-14 inline-flex items-center gap-2 font-semibold text-orange-300 transition hover:gap-3"
          >
            Request Your Free Quote
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
