import React, { useState } from "react";
import { CartItem as CartItemType } from "../types";
import { useCart } from "../context/CartContext";

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
  const cart = useCart();
  const [imgError, setImgError] = useState(false);
  const rawImg = item.product.images?.[0] ?? "";
  const imageUrl = rawImg.replace(/['"[\]]/g, "");
  const hasValidImg = imageUrl.startsWith("http") && !imgError;
  const subtotal = (item.product.price * item.quantity).toFixed(2);

  return (
    <div
      role="listitem"
      aria-label={`${item.product.title}, quantity ${item.quantity}`}
      className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 animate-fadeInUp"
    >
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${hasValidImg ? "bg-gray-100" : "bg-blue-50"}`}>
        {hasValidImg ? (
          <img
            src={imageUrl}
            alt={item.product.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-blue-400"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {item.product.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          ${item.product.price} each
        </p>
      </div>
      <div
        className="flex items-center gap-1.5"
        role="group"
        aria-label="Quantity controls"
      >
        <button
          onClick={() => cart.decreaseQuantity(item.product.id)}
          aria-label={`Decrease quantity of ${item.product.title}`}
          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors text-base leading-none"
        >
          −
        </button>
        <span
          aria-label="Quantity"
          className="w-6 text-center text-sm font-semibold text-gray-800"
        >
          {item.quantity}
        </span>
        <button
          onClick={() => cart.addItem(item.product)}
          aria-label={`Increase quantity of ${item.product.title}`}
          className="w-7 h-7 flex items-center justify-center rounded-md text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors text-base leading-none"
        >
          +
        </button>
      </div>
      <p
        className="text-sm font-semibold w-16 text-right flex-shrink-0 text-blue-600"
        aria-label={`Subtotal $${subtotal}`}
      >
        ${subtotal}
      </p>
      <button
        onClick={() => cart.removeItem(item.product.id)}
        aria-label={`Remove ${item.product.title} from cart`}
        className="w-7 h-7 flex items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex-shrink-0"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;