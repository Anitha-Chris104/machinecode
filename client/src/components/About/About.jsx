import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";
import aboutBg from "../../assets/about-bg.svg";

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#071B34] py-28"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div
          className="
            grid
            lg:grid-cols-[40%_60%]
            gap-20
            items-center
            
          "
        >
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </section>
  );
};

export default About;
