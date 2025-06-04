import { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import MapView, { Marker } from "react-native-maps";
import { Auth0Provider } from "react-native-auth0";
import { auth0Config } from "./app/config/auth0";
import { AuthProvider, useAuth } from "./app/contexts/AuthContext";

function MapScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialCamera={{
          center: { latitude: -33.8688, longitude: 151.2099 },
          zoom: 3,
          heading: 0,
          pitch: 0,
        }}
        // provider="google"
      >
        <Marker
          coordinate={{ latitude: -33.8688, longitude: 151.2099 }}
          icon={require("./src/assets/pin.png")}
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

function MainApp() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>ようこそ</Text>
        <Text style={styles.subtitle}>続行するにはログインしてください</Text>
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Auth0でログイン</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <MapScreen />;
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

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
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId}>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Auth0Provider>
  );
}

/**
 *
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("./src/assets/pin.png")].map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
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
