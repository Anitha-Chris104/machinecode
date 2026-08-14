import { motion } from "framer-motion";

const ContactCard = ({ icon: Icon, title, value, description, color }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-100 blur-3xl opacity-0 transition duration-500 group-hover:opacity-70" />

      {/* Icon */}
      <div
        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}
      >
        <Icon
          size={30}
          className="text-white transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-[#0D244D]">{title}</h3>

      <p className="mt-3 font-semibold text-gray-800">{value}</p>

      <p className="mt-2 text-sm leading-7 text-gray-500">{description}</p>

      {/* Bottom Line */}
      <div className="mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-[#C2441C] to-[#852E47] transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
};

export default ContactCard;
