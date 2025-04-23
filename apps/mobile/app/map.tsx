import { StyleSheet, View } from "react-native";
import { Stack, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function MapScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "地図から探す", headerShown: true }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={<View style={styles.headerImage} />}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">地図から探す</ThemedText>
          <ThemedText style={styles.description}>
            このページでは地図を使ってシーシャバーを探すことができます。
          </ThemedText>
          <ThemedView style={styles.buttonContainer}>
            <ThemedText
              type="link"
              onPress={() => router.back()}
              style={styles.button}
            >
              ホームに戻る
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  description: {
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    padding: 8,
  },
});
