import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import MapView, { Marker } from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../constants/location";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

export default function MapScreen() {
  const [isReady, setIsReady] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    (async () => {
      await Promise.all([...cacheImages()]);
      setIsReady(true);
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialCamera={{
          center: SHINJUKU_COORDINATE,
          zoom: 3,
          heading: 0,
          pitch: 0,
        }}
        // provider="google"
      >
        <Marker
          coordinate={{ latitude: -33.8688, longitude: 151.2099 }}
          icon={require("../../src/assets/pin.png")}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </MapView>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            ようこそ、{user.name || user.email}!
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>ログアウト</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/**
 *
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("../../src/assets/pin.png")].map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const styles = StyleSheet.create({
  userInfo: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
