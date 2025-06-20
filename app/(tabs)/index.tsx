import { ScrollView, StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsByCategory } from "@/services/productService";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const scheme = useColorScheme();
  const { user } = useAuth();

  const [electronic, setElectronic] = useState<any[]>([]);
  const [fashion, setFashion] = useState<any[]>([]);

  const iconColor = scheme == "dark" ? Colors.dark.icon : Colors.light.icon;
  const buttonColor =
    scheme == "dark" ? Colors.dark.button : Colors.light.button;

  const loadElectronic = async () => {
    try {
      const product = await getProductsByCategory("Elektronik");
      if (product && product.length > 0) {
        setElectronic(product);
      } else {
        console.warn("No electronic products found.");
      }
    } catch (e) {
      console.error("Failed to load electronic data:", e);
    }
  };

  const loadFashion = async () => {
    try {
      const product = await getProductsByCategory("Fashion");
      if (product && product.length > 0) {
        setFashion(product);
      } else {
        console.warn("No fashion products found.");
      }
    } catch (e) {
      console.error("Failed to load fashion data:", e);
    }
  };

  useEffect(() => {
    loadElectronic();
    loadFashion();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.iconNameContainer}>
            <ThemedView
              style={[
                styles.iconContainer,
                { backgroundColor: buttonColor, borderRadius: 25 },
              ]}
            >
              <IconSymbol name="person.fill" color={iconColor} />
            </ThemedView>
            <ThemedText>
              Welcome,{" "}
              <ThemedText type="defaultSemiBold">{user?.name}</ThemedText>
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.bannerContainer}>
            <Image
              source={{
                uri: "https://placehold.co/600x200?text=Special+Promo+Banner",
              }}
              style={styles.bannerImage}
              contentFit="cover"
            />
          </ThemedView>
          <ThemedView>
            <ThemedView style={styles.subtitleContainer}>
              <ThemedText type="subtitle">Electronic</ThemedText>
              <IconSymbol name="arrow.forward" color={iconColor} />
            </ThemedView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingVertical: 16 }}
            >
              {electronic.map((item) => (
                <ThemedView key={item.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/product/show/[id]",
                        params: { id: item.id },
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardImage}
                      contentFit="cover"
                    />
                    <ThemedText style={styles.cardTitle}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.cardPrice}>
                      Rp {item.price}
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              ))}
            </ScrollView>
          </ThemedView>
          <ThemedView>
            <ThemedView style={styles.subtitleContainer}>
              <ThemedText type="subtitle">Fashion</ThemedText>
              <IconSymbol name="arrow.forward" color={iconColor} />
            </ThemedView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingVertical: 16 }}
            >
              {fashion.map((item) => (
                <ThemedView key={item.id} style={styles.card}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/product/show/[id]",
                        params: { id: item.id },
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardImage}
                      contentFit="cover"
                    />
                    <ThemedText style={styles.cardTitle}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.cardPrice}>
                      Rp {item.price}
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    paddingBottom: 100,
  },
  iconNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  bannerContainer: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  card: {
    width: 150,
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    marginTop: 8,
  },
  cardPrice: {
    marginTop: 4,
  },
});
