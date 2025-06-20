import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { createUser } from "@/services/userService";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

export default function RegisterScreen() {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const scheme = useColorScheme();

  const cardColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;
  const tintColor = scheme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const textColor = scheme === "dark" ? Colors.dark.text : Colors.light.text;

  const onRegister = async () => {
    try {
      const id = uuid.v4().toString();

      await createUser(id, name, email, password);

      const success = await login(email, password);
      if (success) {
        Alert.alert(
          "Success",
          "Your account has been created successfully. You are now logged in.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/(tabs)"),
            },
          ],
          { cancelable: false }
        );
      } else {
        setError("Failed to log in after registration. Please try again.");
      }
    } catch (e: any) {
      console.error("Register error:", e);
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title} type="title">
          Register
        </ThemedText>

        <TextInput
          placeholder="Name"
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
            },
          ]}
          placeholderTextColor={textColor}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
            },
          ]}
          value={email}
          placeholderTextColor={textColor}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
            },
          ]}
          value={password}
          placeholderTextColor={textColor}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Button title="Register" onPress={onRegister} />
        <ThemedText onPress={() => router.push("/login")} style={styles.link}>
          Have an account?{" "}
          <ThemedText type="defaultSemiBold">Sign In now</ThemedText>
        </ThemedText>
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
