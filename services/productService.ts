import { getDatabase } from "@/services/database";

export const getProducts = async () => {
  const db = getDatabase();
  const products = await db.getAllAsync<{
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    user_id: string;
  }>("SELECT * FROM products");

  return products.map((product) => ({
    ...product,
    price: product.price.toFixed(2),
  }));
};

export const getProductById = async (id: string) => {
  const db = getDatabase();
  const product = await db.getFirstAsync<{
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    user_id: string;
  }>("SELECT * FROM products WHERE id = ?", [id]);

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    ...product,
    price: product.price.toFixed(2),
  };
};

export const createProduct = async (
  id: string,
  title: string,
  description: string,
  category: string,
  image: string,
  price: number,
  user_id: string
) => {
  const db = getDatabase();
  await db.runAsync(
    "INSERT INTO products (id, title, description, category, image, price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, title, description, category, image, price, user_id]
  );
};

export const updateProduct = async (
  id: string,
  title: string,
  description: string,
  category: string,
  image: string,
  price: number,
  user_id: string
) => {
  const db = getDatabase();
  await db.runAsync(
    "UPDATE products SET title = ?, description = ?, category = ?, image = ?, price = ?, user_id = ? WHERE id = ?",
    [title, description, category, image, price, user_id, id]
  );
};

export const deleteProduct = async (id: string) => {
  const db = getDatabase();
  await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
};

export const getProductsByUserId = async (user_id: string) => {
  const db = getDatabase();
  const products = await db.getAllAsync<{
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    user_id: string;
  }>("SELECT * FROM products WHERE user_id = ?", [user_id]);

  return products.map((product) => ({
    ...product,
    price: product.price.toFixed(2),
  }));
};

export const getProductsByCategory = async (category: string) => {
  const db = getDatabase();
  const products = await db.getAllAsync<{
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number;
    user_id: string;
  }>("SELECT * FROM products WHERE category = ?", [category]);

  return products.map((product) => ({
    ...product,
    price: product.price.toFixed(2),
  }));
};
