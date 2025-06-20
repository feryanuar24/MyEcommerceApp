import { initDB } from "@/services/database";
import { loginUser } from "@/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initDB();
    const loadSession = async () => {
      const userStr = await AsyncStorage.getItem("user");
      if (userStr) setUser(JSON.parse(userStr));
    };
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = await loginUser(email, password);
    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
