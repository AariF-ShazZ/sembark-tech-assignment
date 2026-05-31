import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = observer(() => {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Home link */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
          aria-label="Go to home page"
        >
          🛍 ShopApp
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>

          {/* Cart icon with badge */}
          <button
            onClick={() => navigate("/cart")}
            aria-label={`View cart, ${cart.totalItems} items`}
            className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            🛒 Cart
            {cart.totalItems > 0 && (
              <span
                className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                aria-hidden="true"
              >
                {cart.totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;