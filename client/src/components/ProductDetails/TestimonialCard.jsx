import { Star, Quote } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100">
      <Quote size={40} className="text-orange-500 opacity-30" />

      {/* Rating */}
      <div className="mt-4 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={18} fill="#f97316" className="text-orange-500" />
        ))}
      </div>

      {/* Review */}
      <p className="mt-6 leading-8 text-gray-600 italic">
        "{testimonial.review}"
      </p>

      {/* User */}
      <div className="mt-8 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h4 className="font-bold text-slate-800">{testimonial.name}</h4>

          <p className="text-sm text-gray-500">{testimonial.position}</p>

          <p className="text-sm font-medium text-orange-500">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
