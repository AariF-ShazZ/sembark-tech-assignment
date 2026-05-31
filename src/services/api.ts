import axios from "axios";
import { Product, Category, ProductsApiParams } from "../types";

const BASE_URL = "https://api.escuelajs.co/api/v1";


export async function fetchCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${BASE_URL}/categories`);
  return response.data;
}

export async function fetchProducts(
  params: ProductsApiParams = {}
): Promise<Product[]> {
  const searchParams: Record<string, string | number> = {};

  if (params.categoryId !== undefined)
    searchParams["categoryId"] = params.categoryId;
  if (params.title !== undefined)
    searchParams["title"] = params.title;
  if (params.price_min !== undefined)
    searchParams["price_min"] = params.price_min;
  if (params.price_max !== undefined)
    searchParams["price_max"] = params.price_max;
  if (params.offset !== undefined)
    searchParams["offset"] = params.offset;
  if (params.limit !== undefined)
    searchParams["limit"] = params.limit;

  const response = await axios.get<Product[]>(`${BASE_URL}/products`, {
    params: searchParams,
  });
  return response.data;
}


export async function fetchProductById(id: number): Promise<Product> {
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return response.data;
}