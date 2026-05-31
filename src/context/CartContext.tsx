import React, { createContext, useContext } from "react";
import { cartStore } from "../store/CartStore";

// We export the store instance via Context
// This keeps MobX as the source of truth while satisfying the Context API requirement
const CartContext = createContext<typeof cartStore | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
  );
};

export const useCart = (): typeof cartStore => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
