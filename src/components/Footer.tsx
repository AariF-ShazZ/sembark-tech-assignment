import React from "react";
import { observer } from "mobx-react-lite";
import { useCart } from "../context/CartContext";

const Footer: React.FC = observer(() => {
  const cart = useCart();

  return (
    <footer
      role="contentinfo"
      className="bg-gray-900 text-white py-4 mt-auto"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-400">© 2024 ShopApp. All rights reserved.</p>

        {/* Cart summary in footer — required by spec */}
        <div
          aria-live="polite"
          aria-label="Cart summary"
          className="flex items-center gap-4 text-sm"
        >
          <span className="text-gray-300">
            🛒 <strong>{cart.totalItems}</strong> item{cart.totalItems !== 1 ? "s" : ""} in cart
          </span>
          <span className="text-green-400 font-semibold">
            Total: ${cart.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </footer>
  );
});

export default Footer;