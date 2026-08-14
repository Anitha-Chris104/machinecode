import factoryImage from "../../assets/factory.jpeg";
import FloatingCard from "./FloatingCard";
import { FaIndustry } from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";

const AboutImage = () => {
  return (
    <div className="relative w-full max-w-[650px] mx-auto lg:mx-0">
      {/* Orange Glow */}
      <div
        className="
          absolute
          -bottom-10
          -left-10
          h-56
          w-56
          rounded-full
          bg-orange-500
          opacity-30
          blur-[120px]
        "
      ></div>
      <div className="absolute -top-8 right-8 w-36 h-36 rounded-full bg-orange-400/20 blur-[80px]"></div>

      {/* Premium Frame */}
      <div
        className=" relative
        rounded-[38px]
        p-[10px]

        bg-gradient-to-br
        from-slate-500/40
        via-slate-700/30
        to-slate-900/50

        border
        border-white/10

        shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
      >
        <img
          src={factoryImage}
          alt="Factory"
          className="
            w-full
            h-[650px]
            object-cover
            rounded-[28px]
            transition
            duration-700
            hover:scale-[1.02]
          "
        />
      </div>
      <div className="absolute top-8 -left-13 z-20">
        <FloatingCard
          icon={<FaIndustry />}
          title="15+ Years"
          subtitle="Manufacturing Excellence"
          smallpara="Trusted Since 2008"
        />
      </div>
      <div className="absolute -bottom-4 -right-4 z-20">
        <FloatingCard
          icon={<HiShieldCheck />}
          title="ISO 9001"
          subtitle="Certified Company"
          smallpara="Quality You Can Rely On"
        />
      </div>
    </div>
  );
};

export default AboutImage;
