import { getDatabase } from "@/services/database";
import { hashPassword } from "@/utils/hash";

export const createUser = async (
  id: string,
  name: string,
  email: string,
  password: string
) => {
  const db = getDatabase();
  const hashedPassword = await hashPassword(password);
  await db.runAsync(
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    [id, name, email, hashedPassword]
  );
};

export const loginUser = async (email: string, password: string) => {
  const db = getDatabase();
  const hashedPassword = await hashPassword(password);

  const result = await db.getFirstAsync<{
    id: string;
    name: string;
    email: string;
    password: string;
  }>("SELECT * FROM users WHERE email = ? AND password = ?", [
    email,
    hashedPassword,
  ]);

  if (!result) {
    return null; // User not found or password incorrect
  }

  return {
    id: result.id,
    name: result.name,
    email: result.email,
  };
};
