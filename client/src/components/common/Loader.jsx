import { motion, AnimatePresence } from "framer-motion";
import { Factory } from "lucide-react";

const Loader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#07162D]"
        >
          {/* Background Glow */}
          <div className="absolute h-96 w-96 rounded-full bg-[#C2441C]/20 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#852E47] to-[#C2441C] shadow-2xl"
            >
              <Factory size={42} className="text-white" />
            </motion.div>

            {/* Company Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-4xl font-bold text-white"
            >
              Machine
              <span className="text-[#C2441C]">Code</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-gray-300"
            >
              Building Industrial Excellence...
            </motion.p>

            {/* Loader */}
            <div className="mt-10 h-2 w-64 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "linear",
                }}
                className="h-full w-32 rounded-full bg-gradient-to-r from-[#852E47] to-[#C2441C]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
