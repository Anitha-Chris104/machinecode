import { useState } from "react";

const ImageZoom = ({ src, alt }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className="relative hidden md:block overflow-hidden rounded-3xl"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        className="h-[500px] w-full cursor-zoom-in object-contain bg-white p-10"
      />

      {/* Zoom Overlay */}
      {showZoom && (
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "250%",
            backgroundPosition,
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;
