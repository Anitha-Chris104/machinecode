import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./featuredSwiper.css";

import FeaturedHeader from "./FeaturedHeader";
import FeaturedSlide from "./FeaturedSlide";
import { featuredProducts } from "./featuredData";

const FeaturedProducts = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative py-24 bg-[#aa542b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <FeaturedHeader />

        <div className="relative mt-20">
          {/* Navigation */}

          <div className="absolute top-8 right-8 flex gap-3 z-20">
            <button
              className="featured-prev
              w-12
              h-12
              rounded-full
              bg-white/90
              backdrop-blur
              shadow-lg
              hover:bg-orange-500
              hover:text-white
              transition"
            >
              <ChevronLeft />
            </button>

            <button
              className="featured-next
                    w-12
                    h-12
                    rounded-full
                    bg-white/90
                    backdrop-blur
                    shadow-lg
                    hover:bg-orange-500
                    hover:text-white
                    transition"
            >
              <ChevronRight />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".featured-prev",
              nextEl: ".featured-next",
            }}
            pagination={{
              clickable: true,
            }}
            className="featuredSwiper"
          >
            {featuredProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <FeaturedSlide {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-8">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
