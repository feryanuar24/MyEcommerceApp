import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { getProducts } from "@/services/productService";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const [products, setProducts] = useState<any[]>([]);

  const scheme = useColorScheme();

  const cardColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;
  const iconColor = scheme === "dark" ? Colors.dark.icon : Colors.light.icon;

  const loadProducts = async () => {
    try {
      const userProducts = await getProducts();
      setProducts(userProducts);
    } catch (e) {
      console.error("Gagal memuat produk:", e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <ThemedView style={[styles.card, { backgroundColor: cardColor }]}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/product/show/[id]",
            params: { id: item.id },
          })
        }
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <ThemedView style={[styles.image, styles.imagePlaceholder]}>
            <ThemedText>No Image</ThemedText>
          </ThemedView>
        )}
        <ThemedView style={styles.details}>
          <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
          <ThemedText type="link">Rp {item.price}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText
          type="title"
          style={{ marginHorizontal: 20, marginVertical: 15 }}
        >
          Explore
        </ThemedText>
        {products.length === 0 ? (
          <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
            Product Unavailable
          </ThemedText>
        ) : (
          <ThemedView style={styles.subcontainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
            />
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingBottom: 150,
  },
  subcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    height: 150,
  },
  imagePlaceholder: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    padding: 10,
    height: 100,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
