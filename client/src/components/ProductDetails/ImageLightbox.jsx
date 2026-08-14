import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageLightbox = ({
  isOpen,
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length, onClose, setCurrentIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <X size={28} />
        </button>

        {/* Previous */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length,
            );
          }}
          className="absolute left-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Image */}
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt=""
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
        />

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % images.length);
          }}
          className="absolute right-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronRight size={30} />
        </button>

        {/* Thumbnails */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 overflow-x-auto rounded-xl bg-black/40 p-3"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`overflow-hidden rounded-lg border-2 ${
                currentIndex === index
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-16 w-16 object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
