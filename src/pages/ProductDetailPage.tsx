import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { ShoppingCart, Check, ArrowLeft, AlertCircle } from "lucide-react";
const ProductDetailPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cart = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchProductById(Number(id))
      .then(setProduct)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);
  const handleAddToCart = () => {
    if (!product) return;
    cart.addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const rawImg = product?.images?.[0] ?? "";
  const imageUrl = rawImg.replace(/['"[\]]/g, "");
  const hasValidImg = imageUrl.startsWith("http") && !imgError;

  if (loading) return <Loader message="Loading product…" />;

  if (error)
    return (
      <div
        role="alert"
        className="max-w-md mx-auto mt-20 flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-5 py-4 text-sm"
      >
        <AlertCircle size={16} aria-hidden="true" />
        {error}
      </div>
    );

  if (!product)
    return (
      <p className="text-center py-20 text-sm text-gray-400">
        Product not found.
      </p>
    );
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-7 transition-colors group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        Back to products
      </button>
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-5/12 min-h-72 md:min-h-96 bg-gray-50 flex items-center justify-center">
            {hasValidImg ? (
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-full object-cover md:max-h-96"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-6xl">🛍️</span>
            )}
          </div>
          <div className="md:w-7/12 p-7 sm:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {product.category?.name ?? "Uncategorized"}
              </span>
              <span className="text-xs text-gray-300">ID #{product.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description}
            </p>
            <p
              className="text-3xl font-semibold text-blue-600"
              aria-label={`Price: $${product.price}`}
            >
              ${product.price}
            </p>
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
              className={`flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95 mt-auto ${
                added
                  ? "bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {added ? (
                <>
                  <Check size={17} aria-hidden="true" />
                  Added to cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={17} aria-hidden="true" />
                  Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;