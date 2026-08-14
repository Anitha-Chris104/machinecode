import WhyChooseHeader from "./WhyChooseHeader";
import CompanyLogos from "../WhyChooseUs/CompanyLogos";
import StatsSection from "./StatsSection";
import RatingCards from "./RatingCards";
import BottomFeatures from "./BottomFeatures";

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#071B33] py-18">
      {/* Left Blue Glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[160px]" />

      {/* Right Orange Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[180px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
        linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
      `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(37,99,235,.12), transparent 40%), radial-gradient(circle at 90% 70%, rgba(249,115,22,.12), transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <WhyChooseHeader />

        <CompanyLogos />

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-start">
          <StatsSection />

          <RatingCards />
        </div>
        <BottomFeatures />
      </div>
    </section>
  );
};

export default WhyChooseUs;
