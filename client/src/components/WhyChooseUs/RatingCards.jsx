import { reviews } from "../../data/reviews";
import RatingCard from "./RatingCard";
import { motion } from "framer-motion";
import { fadeRight } from "../../animations/motionVariants";

const RatingCards = () => {
  return (
    <div
      variants={fadeRight}
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-6
      "
    >
      {reviews.map((review) => (
        <RatingCard key={review.id} {...review} />
      ))}
    </div>
  );
};

export default RatingCards;
