import { Image, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { Button, Text } from "tamagui";

import { HelloWave } from "components/HelloWave";
import ParallaxScrollView from "components/ParallaxScrollView";
import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">ごーとぅーしーしゃ!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Link href="./map">
          <Button backgroundColor="#007BFF" padding={10} borderRadius={5}>
            <Text color="#fff" fontSize={16}>
              地図からシーシャを探す
            </Text>
          </Button>
        </Link>
        <Link href="./area">
          <Button backgroundColor="#007BFF" padding={10} borderRadius={5}>
            <Text color="#fff" fontSize={16}>
              地域から探す
            </Text>
          </Button>
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
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
  buttonContainer: {
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
