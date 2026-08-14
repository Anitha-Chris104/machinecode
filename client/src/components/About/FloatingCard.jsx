const FloatingCard = ({ icon, title, subtitle, smallpara }) => {
  return (
    <div
      className="w-[170px] h-[210px] rounded-[28px] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/15
  shadow-[0_20px_60px_rgba(0,0,0,0.45)] px-4 py-5 flex flex-col items-start gap-4 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
    >
      {/* Icon at the top */}
      <div className="w-14 h-14 rounded-2xl bg-orange-700 flex items-center justify-center text-3xl shadow-lg">
        {icon}
      </div>

      {/* Text below */}
      <div className="text-start flex flex-col items-start gap-1">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-gray-300 text-lg">{subtitle}</p>
        <p className="text-orange-700 text-xs  font-semibold">{smallpara}</p>
      </div>
    </div>
  );
};
74;

export default FloatingCard;
