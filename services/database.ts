import { openDatabaseAsync } from "expo-sqlite";

let db: Awaited<ReturnType<typeof openDatabaseAsync>>;

export const initDB = async () => {
  db = await openDatabaseAsync("ecommerce.db");

  // Products table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL,
      user_id TEXT NOT NULL
    );
  `);

  // Users table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
};

export const getDatabase = () => db;
