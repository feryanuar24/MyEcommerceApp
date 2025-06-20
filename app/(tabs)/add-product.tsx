import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { createProduct } from "@/services/productService";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";

export default function AddProductScreen() {
  const { user } = useAuth();
  const scheme = useColorScheme();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    price: 0,
    user_id: user?.id || "",
  });

  const cardColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;
  const tintColor = scheme === "dark" ? Colors.dark.tint : Colors.light.tint;
  const textColor = scheme === "dark" ? Colors.dark.text : Colors.light.text;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProduct({
        ...product,
        image: result.assets[0].uri,
      });
    }
  };

  const handleSubmit = async () => {
    if (
      !product.title ||
      !product.description ||
      !product.category ||
      !product.image ||
      !product.price
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const id = uuid.v4().toString();

      await createProduct(
        id,
        product.title,
        product.description,
        product.category,
        product.image,
        product.price,
        product.user_id
      );

      Alert.alert("Success", "Product added successfully", [
        {
          text: "OK",
          onPress: () => {
            setProduct({
              title: "",
              description: "",
              category: "",
              image: "",
              price: 0,
              user_id: user?.id || "",
            });
            router.replace("/(tabs)");
          },
        },
      ]);
    } catch (e: any) {
      console.error("Error adding product:", e);
      Alert.alert(
        "Error",
        "An error occurred while adding the product. Please try again. "
      );
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ marginBottom: 12 }}>
          Add Product
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Product Name
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
          value={product.title}
          onChangeText={(text) =>
            setProduct({
              ...product,
              title: text,
            })
          }
        />

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Description
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
          value={product.description}
          onChangeText={(text) =>
            setProduct({
              ...product,
              description: text,
            })
          }
          multiline
        />

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Category
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
          value={product.category}
          onChangeText={(text) =>
            setProduct({
              ...product,
              category: text,
            })
          }
        />

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Image
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.imagePicker,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            },
          ]}
          onPress={pickImage}
        >
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <ThemedText type="link">Pick Image</ThemedText>
          )}
        </TouchableOpacity>

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Price
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: cardColor,
              borderColor: tintColor,
              color: textColor,
              marginBottom: 20,
            },
          ]}
          value={product.price.toString()}
          onChangeText={(text) =>
            setProduct({ ...product, price: parseFloat(text) })
          }
          keyboardType="numeric"
        />

        <Button title="Add Product" onPress={handleSubmit} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  label: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
});
