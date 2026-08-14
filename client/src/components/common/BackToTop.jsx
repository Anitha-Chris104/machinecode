import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.1,
            y: -4,
          }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#852E47] via-[#C2441C] to-[#AA542B] text-white shadow-[0_10px_35px_rgba(194,68,28,.45)] border border-white/20 backdrop-blur-xl overflow-hidden group"
        >
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />
          <ChevronUp
            size={24}
            className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
