import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { deleteProduct, getProductById } from "@/services/productService";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const { user } = useAuth();
  const scheme = useColorScheme();

  if (!user) {
    return <Redirect href="/login" />;
  }

  const loadProduct = async () => {
    try {
      const productData = await getProductById(id as string);
      if (productData) {
        setProduct(productData);
      } else {
        console.warn("Product not found.");
      }
    } catch (e) {
      console.error("Failed to load product data:", e);
    }
  };

  const isUserProduct = () => {
    return product && user.id === product.user_id;
  };

  const handleDeleteProduct = async () => {
    try {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this product?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteProduct(product.id);
                Alert.alert("Success", "Product deleted successfully.");
                router.back();
              } catch (e) {
                console.error("Failed to delete product:", e);
                Alert.alert(
                  "Error",
                  "Failed to delete the product. Please try again later."
                );
              }
            },
          },
        ]
      );
    } catch (e) {
      console.error("Failed to delete product:", e);

      Alert.alert(
        "Error",
        "Failed to delete the product. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const cardColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;
  const iconColor = scheme === "dark" ? Colors.dark.icon : Colors.light.icon;

  return (
    <SafeAreaView>
      <ThemedView style={[styles.topbar, { backgroundColor: cardColor }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="arrow.backward" color={iconColor} />
        </TouchableOpacity>
        <ThemedText type="subtitle">Product Detail</ThemedText>
      </ThemedView>
      {product === null ? (
        <ThemedView style={styles.container}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <ThemedText type="subtitle">{product.title}</ThemedText>
          <ThemedText style={styles.price} type="link">
            Rp {product.price}
          </ThemedText>
          <ThemedText>{product.description}</ThemedText>
          <ThemedText style={styles.category} type="defaultSemiBold">
            Kategori: {product.category}
          </ThemedText>
          {isUserProduct() && (
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/product/edit/[id]",
                    params: { id: product.id },
                  })
                }
                style={[styles.editButton, { backgroundColor: cardColor }]}
              >
                <IconSymbol name="pencil.circle.fill" color={iconColor} />
                <ThemedText type="defaultSemiBold">Edit</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteProduct}
                style={[styles.deleteButton, { backgroundColor: cardColor }]}
              >
                <IconSymbol name="trash.fill" color={iconColor} />
                <ThemedText type="defaultSemiBold">Delete</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    padding: 16,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  price: {
    marginVertical: 8,
    marginBottom: 50,
  },
  category: {
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 50,
  },
  editButton: {
    borderRadius: 5,
    width: 120,
    height: 40,
    textAlign: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  deleteButton: {
    borderRadius: 5,
    width: 120,
    height: 40,
    textAlign: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
