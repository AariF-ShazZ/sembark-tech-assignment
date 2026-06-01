import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, getInitialState } from "../reducer/CartReducer";
import { CartItem, Product } from "../types";
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | null>(null);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());
  const totalItems = state.cartItems.reduce((sum, index) => sum + index.quantity, 0);
  const totalPrice = state.cartItems.reduce(
    (sum, index) => sum + index.product.price * index.quantity,
    0,
  );
  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeItem = (productId: number) =>{
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  }
  const decreaseQuantity = (productId: number) =>{
    dispatch({ type: "DECREASE_QTY", payload: productId });
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
}
  return (
    <CartContext.Provider
      value={{
        items: state.cartItems,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
