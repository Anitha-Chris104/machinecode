const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="
      group
      flex items-start gap-1
      rounded-2xl
      h-full
      border border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-3
      transition-all duration-500

      hover:border-orange-500/40
      hover:bg-white/[0.06]
      hover:-translate-y-2
      hover:shadow-[0_20px_40px_rgba(255,120,0,0.18)]
      "
    >
      {/* Icon */}
      <div
        className="
        flex-shrink-0
        w-14 h-14
        rounded-full
        bg-gradient-to-br
        from-orange-500
        to-orange-600
        flex items-center justify-center
        text-2xl text-white
        shadow-lg
        transition-all duration-500
        group-hover:scale-110
        "
      >
        <Icon />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-lg leading-snug">{title}</h3>

        <p className="mt-2 text-gray-300 text-xs leading-4">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
