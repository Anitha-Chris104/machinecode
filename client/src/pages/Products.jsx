import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";

import ProductsHero from "../components/Products/ProductsHero";
import SearchBar from "../components/Products/SearchBar";
import CategoryFilter from "../components/Products/CategoryFilter";
import ProductFilter from "../components/Products/ProductFilter";
import ProductGrid from "../components/Products/ProductGrid";

import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [sortBy, setSortBy] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.shortDescription?.toLowerCase().includes(search),
      );
    }

    // Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Industry
    if (selectedIndustry !== "All Industries") {
      filtered = filtered.filter((product) =>
        product.industries?.some(
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
  }, [products, searchTerm, selectedCategory, selectedIndustry, sortBy]);

  return (
    <>
      <Helmet>
        <title>Products | Machine Code</title>

        <meta name="description" content="Explore our industrial machines..." />
      </Helmet>

      <ProductsHero />

      <section id="products" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ProductFilter
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-gray-600">
                Loading products...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-20 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <div className="mt-14">
              <ProductGrid products={filteredProducts} />
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
