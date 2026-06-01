import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Home, ShoppingCart } from "lucide-react";
const Navbar: React.FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 z-50 bg-white border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          aria-label="Meesho home"
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-700 transition-colors">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            Meesho
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Home size={15} aria-hidden="true" />
            Home
          </Link>
          <button
            onClick={() => navigate("/cart")}
            aria-label={`Cart, ${cart.totalItems} item${cart.totalItems !== 1 ? "s" : ""}`}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={17} aria-hidden="true" />
            <span className="hidden sm:inline font-medium">Cart</span>
            {cart.totalItems > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-bounce"
              >
                {cart.totalItems > 9 ? "9+" : cart.totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;