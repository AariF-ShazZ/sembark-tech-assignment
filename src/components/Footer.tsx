import React from "react";
import { useCart } from "../context/CartContext";

const Footer: React.FC = () => {
  const cart = useCart();
  return (
    <footer
      role="contentinfo"
      className="bg-white border-t border-gray-100 mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "#185FA5" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E6F1FB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <span className="text-sm text-gray-400">ShopApp © {new Date().getFullYear()}</span>
        </div>
        <div
          aria-live="polite"
          aria-label="Cart summary"
          className="flex items-center gap-4 text-sm"
        >
          {cart.totalItems > 0 ? (

            <>
              <span className="flex items-center gap-1.5 text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                <strong className="text-gray-800">{cart.totalItems}</strong>
                {" "}item{cart.totalItems !== 1 ? "s" : ""}
              </span>
              <div className="w-px h-4 bg-gray-200" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <span className="text-gray-500">Total</span>
                <strong style={{ color: "#185FA5", fontSize: "15px" }}>
                  ${cart.totalPrice.toFixed(2)}
                </strong>
              </span>
            </>
          ) : (
            <span className="text-gray-400 text-xs">Cart is empty</span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;