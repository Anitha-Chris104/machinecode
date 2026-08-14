import { motion } from "framer-motion";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronIcon } from "./icons";
import cncMachines from "../../assets/cnc-machines.svg";
import factoryMachinery from "../../assets/factory-machinery.svg";
import foodProcessing from "../../assets/food-processing.svg";
import industrialAutomation from "../../assets/industrial-automation.svg";
import laserCutting from "../../assets/laser-cutting.svg";
import roboticWelding from "../../assets/robotic-welding.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const slides = [
  {
    title: "CNC Machines",
    image: cncMachines,
  },
  {
    title: "Laser Cutting",
    image: laserCutting,
  },
  {
    title: "Robotic Welding",
    image: roboticWelding,
  },
  {
    title: "Food Processing Plant",
    image: foodProcessing,
  },
  {
    title: "Industrial Automation",
    image: industrialAutomation,
  },
  {
    title: "Factory Machinery",
    image: factoryMachinery,
  },
];

function HeroCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="relative mx-auto w-full max-w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-[820px]"
    >
      <div
        className="absolute -inset-5 rotate-3 rounded-xl border border-white/10 bg-[#852E47]/20 blur-[1px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-6 top-6 h-64 w-40 rotate-12 rounded-xl bg-[#852E47]/50 blur-sm"
        aria-hidden="true"
      />

      <div className="relative rounded-xl border border-white/25 bg-white/10 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
        <Swiper
          modules={[
            A11y,
            Autoplay,
            EffectCoverflow,
            Keyboard,
            Navigation,
            Pagination,
          ]}
          effect="coverflow"
          speed={900}
          loop
          grabCursor
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 20,
            depth: 120,
            modifier: 1.6,
            slideShadows: false,
          }}
          navigation={{
            prevEl: ".hero-carousel-prev",
            nextEl: ".hero-carousel-next",
          }}
          pagination={{
            clickable: true,
            el: ".hero-carousel-pagination",
          }}
          className="hero-carousel overflow-hidden rounded-lg"
          aria-label="Industrial manufacturing image carousel"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <article className="relative h-[280px] overflow-hidden rounded-lg sm:h-[370px] lg:h-[410px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D244D]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                  {slide.title}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="hero-carousel-prev absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#061a39] text-white shadow-xl transition hover:bg-[#C2441C] focus:outline-none focus:ring-2 focus:ring-white sm:h-14 sm:w-14"
          aria-label="Previous carousel image"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          className="hero-carousel-next absolute right-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-[#061a39] text-white shadow-xl transition hover:bg-[#C2441C] focus:outline-none focus:ring-2 focus:ring-white sm:h-14 sm:w-14"
          aria-label="Next carousel image"
        >
          <ChevronIcon />
        </button>
      </div>

      <div className="hero-carousel-pagination mt-5 flex justify-center gap-3" />
    </motion.div>
  );
}

export default HeroCarousel;
