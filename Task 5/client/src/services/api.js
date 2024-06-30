import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchProducts = () => api.get("/products");
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) =>
  api.post("/products", productData);
export const updateProduct = (id, productData) =>
  api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
