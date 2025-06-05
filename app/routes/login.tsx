import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext.web";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login();
      router.replace("/");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ようこそ</Text>
        <Text style={styles.subtitle}>続行するにはログインしてください</Text>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "ログイン中..." : "Auth0でログイン"}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>エラー: {error.message}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    marginTop: 20,
    textAlign: "center",
  },
});
