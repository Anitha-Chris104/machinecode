import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getRelatedProducts } from "../../services/productService";

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProduct?.category || !currentProduct?.slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const products = await getRelatedProducts(
          currentProduct.category,
          currentProduct.slug,
        );

        setRelatedProducts(products);
      } catch (error) {
        console.error("Failed to fetch related products:", error);

        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct?.category, currentProduct?.slug]);

  // Don't show section while loading
  if (loading) {
    return null;
  }

  // Don't show section if there are no related products
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Explore More
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-800">
            Related Products
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-orange-500" />

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
            Discover other industrial machines that complement your business
            requirements.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-2xl"
            >
              {/* Image */}
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="h-60 w-full object-contain p-6 transition duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm font-semibold text-orange-500">
                  {product.category}
                </span>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {product.name}
                </h3>

                <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                  {product.shortDescription}
                </p>

                <Link
                  to={`/products/${product.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:gap-3"
                >
                  View Details
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
