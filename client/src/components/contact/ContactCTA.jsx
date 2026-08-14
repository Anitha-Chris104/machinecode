import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D244D] via-[#852E47] to-[#C2441C]" />

      {/* Blueprint Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-orange-400/20 blur-[120px]" />
      <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-orange-200 backdrop-blur-md">
            LET'S BUILD TOGETHER
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Ready to Grow Your Business?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">
            Whether you need food processing equipment, industrial mixers,
            conveyors, hotel kitchen systems, or customized machinery, our
            engineering team is ready to help.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-[#0D244D] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Free Consultation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0D244D]"
            >
              <PhoneCall size={18} />
              Call +91 98765 43210
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
