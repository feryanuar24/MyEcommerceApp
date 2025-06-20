import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const scheme = useColorScheme();

  const cardColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;
  const tintColor = scheme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const textColor = scheme === "dark" ? Colors.dark.text : Colors.light.text;

  const onLogin = async () => {
    try {
      const success = await login(email, password);

      if (success) {
        Alert.alert(
          "Success",
          "Welcome back! You are now logged in.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(tabs)"),
            },
          ],
          { cancelable: false }
        );
      } else {
        setError("Your email or password is incorrect. Please try again.");
      }
    } catch (e: any) {
      console.error("Login error:", e);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={textColor}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={textColor}
          secureTextEntry
          onChangeText={setPassword}
        />

        {error ? (
          <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>
        ) : null}

        <Button title="Login" onPress={onLogin} />

        <TouchableOpacity onPress={() => router.push("/register")}>
          <ThemedText style={styles.link}>
            Don't have an account?
            <ThemedText type="defaultSemiBold" style={{ color: tintColor }}>
              {" "}
              Sign Up now
            </ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, height: "100%", justifyContent: "center" },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  title: { marginBottom: 20, height: 50 },
  link: { marginTop: 20, textAlign: "center" },
});
