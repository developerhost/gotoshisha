import { Image, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">ごーとぅシーシャ</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.linkButtonsContainer}>
        <ThemedText
          type="link"
          onPress={() => router.push("/map")}
          style={styles.linkButton}
        >
          地図から探す
        </ThemedText>
        <ThemedText
          type="link"
          onPress={() => router.push("/region")}
          style={styles.linkButton}
        >
          地域から探す
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    gap: 8,
    marginBottom: 8,
  },
  linkButtonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  linkButton: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
