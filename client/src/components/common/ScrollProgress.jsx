import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9998] h-[4px] bg-white/10" />
      <motion.div
        style={{ scaleX }}
        className="
fixed
top-0
left-0
right-0
z-[9999]
h-[4px]
origin-left
bg-gradient-to-r
from-[#852E47]
via-[#C2441C]
to-[#AA542B]
shadow-[0_0_15px_rgba(194,68,28,0.8)]
"
      />
    </>
  );
};

export default ScrollProgress;
