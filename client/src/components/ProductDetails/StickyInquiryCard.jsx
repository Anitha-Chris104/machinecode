import { PhoneCall, ShieldCheck, Clock3, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const StickyInquiryCard = () => {
  return (
    <>
      {/* Desktop Sticky Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block"
      >
        <div className="sticky top-28 rounded-3xl bg-gradient-to-br from-[#0F2D52] to-[#123B68] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <PhoneCall className="text-orange-500" size={30} />

            <h3 className="text-2xl font-bold">Request a Quote</h3>
          </div>

          <p className="mt-4 text-gray-300 leading-7">
            Get pricing, technical support and the best machine recommendation
            from our experts.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-orange-500" size={20} />
              <span>Free Expert Consultation</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="text-orange-500" size={20} />
              <span>Quick Response</span>
            </div>

            <div className="flex items-center gap-3">
              <BadgeCheck className="text-orange-500" size={20} />
              <span>Trusted Industrial Solutions</span>
            </div>
          </div>

          <button
            className="
              mt-8
              w-full
              rounded-xl
              bg-orange-500
              py-4
              font-semibold
              transition
              hover:bg-orange-600
            "
          >
            Get Free Quote
          </button>
        </div>
      </motion.div>

      {/* Mobile Sticky Button */}
      <div className="fixed bottom-5 left-4 right-4 z-50 lg:hidden">
        <button
          onClick={() =>
            document.getElementById("inquiry")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="..."
        >
          📞 Get Free Quote
        </button>
      </div>
    </>
  );
};

export default StickyInquiryCard;
