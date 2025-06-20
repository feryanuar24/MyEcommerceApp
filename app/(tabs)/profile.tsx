import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? Colors.dark.icon : Colors.light.icon;
  const buttonColor =
    scheme === "dark" ? Colors.dark.button : Colors.light.button;

  const openInstagramDM = async () => {
    const url = `instagram://direct?username=feryanuar24`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(
        `https://instagram.com/direct?username=feryanuar24/inbox`
      );
    }
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={{ marginBottom: 12 }}>
          Profile
        </ThemedText>

        <ThemedView style={styles.iconNameContainer}>
          <ThemedView
            style={[
              styles.iconContainer,
              { backgroundColor: buttonColor, borderRadius: 25 },
            ]}
          >
            <IconSymbol name="person.fill" color={iconColor} />
          </ThemedView>

          <ThemedText type="subtitle">{user?.name}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.productContactContainer}>
          <TouchableOpacity
            style={[styles.menuContainer, { backgroundColor: buttonColor }]}
            onPress={() => router.push("/product/my-product")}
          >
            <IconSymbol name="briefcase.fill" color={iconColor} />
            <ThemedText type="defaultSemiBold">My Product</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuContainer, { backgroundColor: buttonColor }]}
            onPress={openInstagramDM}
          >
            <IconSymbol name="gearshape.fill" color={iconColor} />
            <ThemedText type="defaultSemiBold">Contact Us</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <Button
          title="Logout"
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Logout",
                onPress: () => {
                  logout();
                  router.replace("/login");
                },
              },
            ]);
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
  },
  iconNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 50,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  productContactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: "column",
    width: 150,
    height: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
