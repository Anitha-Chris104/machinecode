import ProductHeader from "./ProductHeader";
import ProductGrid from "./ProductGrid";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  return (
    <section className="relative overflow-hidden bg-[#071B35] py-24">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-orange-500/10 blur-[180px] pointer-events-none"></div>
      {/* Background Grid */}
      <div
        className="
        absolute
         pointer-events-none
        inset-0
        opacity-[0.04]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "
      ></div>
      <div
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[900px]
        h-[900px]
        rounded-full
        bg-orange-500/10
        blur-[180px]
        pointer-events-none
      "
      ></div>
      <div
        className="
        absolute
        -left-24
        top-24
        w-72
        h-72
        rounded-full
        border
        border-white/5
      "
      ></div>
      <div
        className="
        absolute
        -right-20
        bottom-16
        w-96
        h-96
        rounded-full
        border
        border-white/5
      "
      ></div>

      <div className="max-w-7xl mx-auto px-6">
        <ProductHeader />

        <ProductGrid />
        <div className="mt-20 flex justify-center">
          <Link
            to="/products"
            className="
            group
            rounded-full
            bg-orange-500
            hover:bg-orange-600
            px-8
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            flex
            items-center
            gap-3
          "
          >
            View All Products
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={18}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
