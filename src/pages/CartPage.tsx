import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItemComponent from "../components/CartItem";

const CartPage: React.FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 page-enter">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>
          {cart.items.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {cart.totalItems} item{cart.totalItems !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {cart.items.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center py-20 gap-5 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Your cart is empty
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Add something from the store
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              aria-label="Continue shopping"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
              style={{ background: "#185FA5" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div
              role="list"
              aria-label="Cart items"
              className="flex flex-col gap-3 mb-5"
            >
              {cart.items.map((item) => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Order summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Items ({cart.totalItems})</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-800">
                  Total
                </span>
                <span
                  className="text-xl font-semibold"
                  style={{ color: "#185FA5" }}
                >
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigate("/")}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Keep shopping
                </button>
                <button
                  onClick={() => cart.clearCart()}
                  aria-label="Remove all items from cart"
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                  style={{
                    background: "#FCEBEB",
                    color: "#A32D2D",
                    border: "0.5px solid #F7C1C1",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default CartPage;
