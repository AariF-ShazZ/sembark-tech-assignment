
export interface Category {
  id: number;
  name: string;
  image: string;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
export interface ProductsApiParams {
  categoryId?: number;
  title?: string;
  price_min?: number;
  price_max?: number;
  offset?: number;
  limit?: number;
}
export interface CartItem {
  product: Product;
  quantity: number;
}