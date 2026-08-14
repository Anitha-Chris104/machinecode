import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageLightbox from "./ImageLightbox";
import ImageZoom from "./ImageZoom";

const ProductGallery = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = product?.images || [];
  const selectedImage = product.images[currentIndex];

  console.log("Product:", product);
  console.log("Product images:", images);

  if (!images.length) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-3xl bg-white text-gray-400">
        {" "}
        No product image available{" "}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <>
          <div onClick={() => setIsOpen(true)} className="cursor-zoom-in">
            <ImageZoom src={selectedImage} alt={product.name} />
          </div>

          {/* Mobile Image */}
          <div onClick={() => setIsOpen(true)} className="block md:hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-[450px] w-full object-contain rounded-3xl bg-white p-6"
            />
          </div>
        </>
        <p className="mt-3 hidden text-center text-sm text-gray-500 md:block">
          🔍 Hover to zoom • Click to view fullscreen
        </p>
      </div>
      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`overflow-hidden rounded-2xl border-2 ${
              currentIndex === index ? "border-orange-500" : "border-gray-200"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-24 w-full object-contain p-2"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        isOpen={isOpen}
        images={product.images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ProductGallery;
