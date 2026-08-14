import { useMemo, useState } from "react";

import ProductsHero from "../components/Products/ProductsHero";
import SearchBar from "../components/Products/SearchBar";
import CategoryFilter from "../components/Products/CategoryFilter";
import ProductGrid from "../components/Products/ProductGrid";
import ProductFilter from "../components/Products/ProductFilter";
import { products } from "../data/products";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );

    // Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Industry
    if (selectedIndustry !== "All Industries") {
      filtered = filtered.filter((product) =>
        product.industries.some(
          (industry) => industry.title === selectedIndustry,
        ),
      );
    }

    // Sort
    if (sortBy === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedIndustry, sortBy]);

  return (
    <>
      <ProductsHero />

      <section id="products" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          {/* Search + Count */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-lg">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="rounded-full bg-orange-100 px-3 py-1 font-bold text-[#C2441C]">
                {filteredProducts.length}
              </span>{" "}
              Products
            </p>
          </div>

          {/* Categories */}
          <div className="mt-8">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Product Filter */}
          <div className="mt-8">
            <ProductFilter
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Product Grid */}
          <div className="mt-14">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
