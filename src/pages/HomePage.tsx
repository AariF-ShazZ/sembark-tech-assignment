import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../services/api";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Category } from "../types";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [catError, setCatError] = useState<string | null>(null);
  const categoryParam = searchParams.get("categories") || "";
  const sortParam = searchParams.get("sort") || "";
  const selectedIds: number[] = categoryParam
    ? categoryParam.split(",").map(Number).filter(Boolean)
    : [];

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e: Error) => setCatError(e.message))
      .finally(() => setCatLoading(false));
  }, []);

  const apiParams = {
    ...(selectedIds.length === 1 ? { categoryId: selectedIds[0] } : {}),
    limit: 20,
  };
  const { products: rawProducts, loading, error } = useFetchProducts(apiParams);
    console.log("products =>", rawProducts);
  const filteredProducts =
    selectedIds.length > 1
      ? rawProducts.filter((p) => selectedIds.includes(p.category?.id))
      : rawProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortParam === "price_asc") return a.price - b.price;
    if (sortParam === "price_desc") return b.price - a.price;
    return 0;
  });
  const toggleCategory = (id: number) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((c) => c !== id)
      : [...selectedIds, id];

    const params: Record<string, string> = {};
    if (updated.length) params["categories"] = updated.join(",");
    if (sortParam) params["sort"] = sortParam;
    setSearchParams(params);
  };

  const handleSort = (value: string) => {
    const params: Record<string, string> = {};
    if (categoryParam) params["categories"] = categoryParam;
    if (value) params["sort"] = value;
    setSearchParams(params);
  };
  const clearFilters = () => {
    const params: Record<string, string> = {};
    if (sortParam) params["sort"] = sortParam;
    setSearchParams(params);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
        <p className="text-md text-gray-800 mt-1">
          {loading
            ? "Loading…"
            : `${sortedProducts.length} product${sortedProducts.length !== 1 ? "s" : ""}`}
          {selectedIds.length > 0 && " · filtered"}
        </p>
      </div>
      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <div role="group" aria-label="Filter by category" className="flex items-center gap-2 flex-wrap flex-1">
          <span className="text-xs text-gray-400 mr-1">Filter:</span>

          {catLoading && (
            <span className="text-xs text-gray-400 animate-pulse">
              Loading categories…
            </span>
          )}
          {catError && (
            <span className="text-xs text-red-400">
              Failed to load categories
            </span>
          )}
          {categories.map((cat) => {
            const isActive = selectedIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                aria-pressed={isActive}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150"
                style={
                  isActive
                    ? { background: "#185FA5", color: "#E6F1FB", borderColor: "#185FA5" }
                    : { background: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
                }
              >
                {cat.name}
              </button>
            );
          })}

          {selectedIds.length > 0 && (
            <button
              onClick={clearFilters}
              aria-label="Clear all filters"
              className="px-2.5 py-1.5 rounded-full text-xs border transition-colors"
              style={{ color: "#A32D2D", borderColor: "#F7C1C1", background: "#FCEBEB" }}
            >
              ✕ Clear
            </button>
          )}
        </div>

        <div className="hidden sm:block w-px h-6 bg-gray-100" aria-hidden="true" />

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-gray-400 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortParam}
            onChange={(e) => handleSort(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>
      </div>
      {loading && <Loader message="Loading products…" />}
      {error && (
        <div role="alert" className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-5 py-4 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}
      {!loading && !error && sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">No products found</p>
          <p className="text-xs text-gray-400">Try removing some filters</p>
        </div>
      )}
      {!loading && !error && sortedProducts.length > 0 && (
        <div
          role="list"
          aria-label="Product listing"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {sortedProducts.map((product, i) => (
            <div role="listitem" key={product.id}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;