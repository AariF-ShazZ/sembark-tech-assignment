import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import { Product, ProductsApiParams } from "../types";
interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}
export function useFetchProducts(
  params: ProductsApiParams
): UseFetchProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const paramsKey = JSON.stringify(params);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProducts(params)
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message || "Failed to fetch products");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [paramsKey]);
  return { products, loading, error };
}