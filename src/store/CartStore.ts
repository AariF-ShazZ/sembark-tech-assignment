import { makeAutoObservable } from "mobx";
import { CartItem, Product } from "../types";

const CART_STORAGE_KEY = "ecommerce_cart";

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  // Load persisted cart from localStorage (bonus requirement)
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch {
      this.items = [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
  }

  addItem(product: Product) {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveToStorage();
  }

  removeItem(productId: number) {
    this.items = this.items.filter((i) => i.product.id !== productId);
    this.saveToStorage();
  }

  decreaseQuantity(productId: number) {
    const existing = this.items.find((i) => i.product.id === productId);
    if (!existing) return;
    if (existing.quantity <= 1) {
      this.removeItem(productId);
    } else {
      existing.quantity -= 1;
      this.saveToStorage();
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  get totalItems(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
  }
}

// Singleton store instance
export const cartStore = new CartStore();