import ProductCard from "./ProductCard";
import { productCategories } from "./productData";
import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/motionVariants";

const ProductGrid = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      {productCategories.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
