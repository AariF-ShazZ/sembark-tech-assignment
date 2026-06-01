import { CartItem, Product } from "../types";
export type CartAction =| { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "DECREASE_QTY"; payload: number }
  | { type: "CLEAR_CART" };
export interface CartState {
  cartItems: CartItem[];
}
const CART_ITEMS_KEY = "cartData";

export function getInitialState(): CartState {
  try {
    const saved = localStorage.getItem(CART_ITEMS_KEY);
    return saved ? { cartItems: JSON.parse(saved) } : { cartItems: [] };
  } catch {
    return { cartItems: [] };
  }
}
export function cartReducer(state: CartState, action: CartAction): CartState {
  let updatedProducts: CartItem[];
  switch (action.type) {

    case "ADD_ITEM": {
      const existsProduct = state.cartItems.find((prod) => prod.product.id === action.payload.id);
      if (existsProduct) {
        updatedProducts = state.cartItems.map((prod) =>
          prod.product.id === action.payload.id
            ? { ...prod, quantity: prod.quantity + 1 }
            : prod
        );
      } else {
        updatedProducts = [...state.cartItems, { product: action.payload, quantity: 1 }];
      }
      break;
    }
    case "REMOVE_ITEM": {
      updatedProducts = state.cartItems.filter((prod) => prod.product.id !== action.payload);
      break;
    }
    case "DECREASE_QTY": {
      updatedProducts = state.cartItems
        .map((prod) =>
          prod.product.id === action.payload
            ? { ...prod, quantity: prod.quantity - 1 }
            : prod
        )
        .filter((prod) => prod.quantity > 0);
      break;
    }
    case "CLEAR_CART": {
      updatedProducts = [];
      break;
    }
    default: return state;
  }
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedProducts));
  return { cartItems: updatedProducts };
}