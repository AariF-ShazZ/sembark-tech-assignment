import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";
interface Props {
  product: Product;
  index?: number;
}
const ProductCard: React.FC<Props> = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const rawImg = product.images?.[0] ?? "";
  const imageUrl = rawImg.replace(/['"[\]]/g, "");
  const isValidImg = imageUrl.startsWith("http") && !imgError;
  return (
    <article
      onClick={() => navigate(`/product/${product.id}/details`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${product.id}/details`)}
      role="button"
      tabIndex={0}
      aria-label={`${product.title}, $${product.price}, click to view details`}
      className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ animation: `fadeInUp 0.35s ease both`, animationDelay: `${index * 50}ms` }}
    >
      <div className="relative h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
        {isValidImg ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-4xl text-gray-300">🛍️</span>
        )}
        <span className="absolute top-2.5 left-2.5 bg-white/90 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-100">
          {product.category?.name ?? "Uncategorized"}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-900 truncate leading-snug">
          {product.title}
        </h2>
        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-semibold text-blue-600">
            ${product.price}
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-100 transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
};
export default ProductCard;