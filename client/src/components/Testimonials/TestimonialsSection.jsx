import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MessageSquareQuote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import TestimonialCard from "../ProductDetails/TestimonialCard";
import { testimonials } from "../ProductDetails/testimonialsData";

const TestimonialsSection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            <MessageSquareQuote size={18} />
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Trusted by businesses across multiple industries for quality,
            reliability, and exceptional service.
          </p>
        </div>

        {/* Slider */}
        <div className="mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            loop
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
