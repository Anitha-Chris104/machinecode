import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PHONE_NUMBER = "919876543210"; // Replace with your WhatsApp number

const FloatingWhatsapp = ({ productName }) => {
  const message = encodeURIComponent(
    `Hello 👋

I'm interested in the ${productName}.

Please share:
• Price
• Specifications
• Delivery Time
• Brochure

Thank you.`,
  );

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
      }}
      className="fixed bottom-6 right-6 z-[999]"
    >
      <a
        href={`https://wa.me/${PHONE_NUMBER}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
    group
    flex
    items-center
    gap-3
    overflow-hidden
    rounded-full
    bg-[#25D366]
    px-5
    py-4
    shadow-2xl
    transition-all
    duration-300
    hover:w-52
    w-16
  "
      >
        {/* Pulse */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25"></span>

        <MessageCircle size={32} className="relative text-white" />

        {/* Tooltip */}
        <span
          className="
            absolute
            right-20
            whitespace-nowrap
            rounded-lg
            bg-slate-900
            px-4
            py-2
            text-sm
            text-white
            opacity-0
            transition-all
            group-hover:opacity-100
          "
        >
          Chat with us
        </span>
      </a>
    </motion.div>
  );
};

export default FloatingWhatsapp;
