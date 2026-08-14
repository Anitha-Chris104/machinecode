import { motion } from "framer-motion";
import { CalendarIcon, GroupIcon, MachinesIcon } from "./icons";

const stats = [
  { value: "15+", label: "Years Experience", icon: CalendarIcon },
  { value: "500+", label: "Machines Installed", icon: MachinesIcon },
  { value: "100+", label: "Clients Served", icon: GroupIcon },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function HeroStats() {
  return (
    <motion.div
      className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-4 pb-8 sm:px-6 md:grid-cols-3 lg:px-8"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.12, delayChildren: 0.62 }}
    >
      {stats.map(({ value, label, icon: Icon }) => (
        <motion.article
          key={label}
          variants={card}
          whileHover={{ y: -7, scale: 1.015 }}
          className="group flex items-center gap-5 rounded-md border border-white/25 bg-[#081b3d]/72 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#C2441C]/70 hover:bg-[#0D244D]/80"
        >
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[#C2441C] to-[#AA542B] text-white shadow-[0_14px_34px_rgba(194,68,28,0.34)] transition group-hover:scale-105">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-4xl font-black leading-none text-white md:text-3xl lg:text-4xl">
              {value}
            </p>
            <p className="mt-2 text-sm font-semibold text-white/86 sm:text-base">
              {label}
            </p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

export default HeroStats;
