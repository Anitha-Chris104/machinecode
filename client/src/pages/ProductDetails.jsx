import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getProductBySlug } from "../services/productService";

import Breadcrumb from "../components/ProductDetails/Breadcrumb";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import SpecificationTable from "../components/ProductDetails/SpecificationTable";
import Applications from "../components/ProductDetails/Applications";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import InquirySection from "../components/ProductDetails/InquirySection";
import StickyInquiryCard from "../components/ProductDetails/StickyInquiryCard";
import FloatingWhatsapp from "../components/common/FloatingWhatsapp";
import WhyChooseMachine from "../components/ProductDetails/WhyChooseMachine";
import FAQSection from "../components/ProductDetails/FAQSection";
import RecommendedIndustries from "../components/ProductDetails/RecommendedIndustries";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";
import FinalCTA from "../components/ProductDetails/FinalCTA";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const productData = await getProductBySlug(slug);

        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);

        setError(error.response?.data?.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F2D52]">
            Product Not Found
          </h2>

          <p className="mt-3 text-gray-500">{error}</p>
        </div>
      </section>
    );
  }

  // Safety check
  if (!product) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Machine Code</title>

        <meta
          name="description"
          content={
            product.shortDescription ||
            "View detailed specifications, images and applications of our industrial machinery."
          }
        />
      </Helmet>

      {/* Breadcrumb */}
      <Breadcrumb product={product} />

      {/* Main Product Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Gallery */}
            <div className="lg:col-span-5">
              <ProductGallery product={product} />
            </div>

            {/* Product Info */}
            <div className="lg:col-span-4">
              <ProductInfo product={product} />
            </div>

            {/* Sticky Inquiry Card */}
            <div className="lg:col-span-3">
              <StickyInquiryCard />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <SpecificationTable product={product} />

      {/* Why Choose Machine */}
      <WhyChooseMachine product={product} />

      {/* Applications */}
      <Applications product={product} />

      {/* Inquiry */}
      <InquirySection product={product} />

      {/* FAQ */}
      <FAQSection product={product} />

      {/* Recommended Industries */}
      <RecommendedIndustries product={product} />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />

      {/* Final CTA */}
      <FinalCTA product={product} />

      {/* WhatsApp */}
      <FloatingWhatsapp productName={product.name} />
    </>
  );
};

export default ProductDetails;
