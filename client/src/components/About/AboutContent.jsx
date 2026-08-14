import FeatureCard from "./FeatureCard";
import { aboutFeatures } from "../../data/aboutFeatures";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const AboutContent = () => {
  return (
    <div className="text-white h-full flex flex-col justify-center">
      {/* Pill Badge */}

      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-orange-500/40 max-w-[300px]">
        <span className="w-2 h-2 rounded-full bg-orange-500"></span>

        <span className="uppercase tracking-[3px] text-sm text-orange-400 font-medium">
          About Our Company
        </span>
      </div>
      {/* Heading */}

      <h2 className="mt-8 text-3xl md:text-4xl xl:text-5xl font-extrabold leading-tight ">
        Engineering Excellence <br /> Built on
        <span className="block text-orange-500">Innovation & Precision</span>
      </h2>
      <div className="mt-8 w-20 h-1 rounded-full bg-orange-500" />
      <p className="mt-2 text-gray-300 leading-7 text-base max-w-[720px]">
        We are a leading industrial machinery manufacturer dedicated to
        delivering high-performance, reliable, and cost-effective solutions for
        a wide range of industries. With advanced manufacturing technology,
        skilled engineers, and a customer-first approach, we build machines that
        drive productivity and growth.
      </p>
      <p className="mt-2 text-gray-300 leading-7 text-base max-w-[720px]">
        From concept to commissioning, we provide end-to-end solutions including
        design, manufacturing, automation, installation, and after-sales
        support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12 max-w-[780px]">
        {aboutFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className="mt-12 flex flex-col sm:flex-row gap-5">
        {/* Primary Button */}
        <button
          className="
          group
          flex items-center justify-center gap-3
          bg-gradient-to-r from-orange-600 to-orange-500
          hover:from-orange-500 hover:to-orange-400
          text-white
          font-semibold
          rounded-xl
          px-10
          h-14
          min-w-[220px]
          transition-all duration-300
          hover:shadow-[0_10px_30px_rgba(249,115,22,.45)]
        "
        >
          Learn More
          <FiArrowRight
            className="
            text-xl
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
          />
        </button>

        {/* Secondary Button */}

        <Link
          to="/products"
          className="
          group
          flex items-center justify-center gap-3
          border
          border-white/20
          bg-white/5
          backdrop-blur-lg
          hover:bg-white/10
          text-white
          font-semibold
          rounded-xl
          px-10
          h-14
          min-w-[220px]
          transition-all duration-300
        "
        >
          View Our Products
          <FiArrowRight
            className="
            text-xl
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
          />
        </Link>
      </div>
    </div>
  );
};

export default AboutContent;
