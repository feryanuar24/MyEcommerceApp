import { AuthProvider } from "@/contexts/AuthContext";
import { Slot } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
