import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [retryKey, setRetryKey] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProducts();

      // Support an array or common API response formats.
      const productData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.products)
            ? response.products
            : Array.isArray(response?.data?.products)
              ? response.data.products
              : null;

      if (!productData) {
        console.error("[Products] Unexpected API response format:", response);
        throw new Error("The server returned an unexpected product format.");
      }

      setProducts(productData);
    } catch (err) {
      console.error("[Products] Failed to load products:", {
        status: err.response?.status ?? "Network or server error",
        message: err.message,
        endpoint: err.config?.url,
      });

      setError(
        err.response?.status === 404
          ? "The products endpoint was not found. Please try again later."
          : err.response?.status >= 500
            ? "The server is temporarily unavailable. Please try again."
            : "Unable to load products. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, retryKey]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(search) ||
          product.shortDescription?.toLowerCase().includes(search),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (selectedIndustry !== "All Industries") {
      filtered = filtered.filter((product) =>
        product.industries?.some(
          (industry) => industry.title === selectedIndustry,
        ),
      );
    }

    if (sortBy === "az") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    if (sortBy === "za") {
      filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
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

          {loading && (
            <div className="py-20 text-center" role="status">
              <p className="text-lg font-medium text-gray-600">
                Loading products...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="py-12 text-center" role="alert" aria-live="polite">
              <p className="mb-4 text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => setRetryKey((key) => key + 1)}
                className="rounded-lg bg-[#852E47] px-5 py-2.5 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#852E47] focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-500">
                No products are available right now.
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="mt-14">
                <ProductGrid products={filteredProducts} />
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500">
                    No products match your search or filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
