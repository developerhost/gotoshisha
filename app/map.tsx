import { useEffect, useState } from "react";
import { Image } from "react-native";
import { YStack, Text, Button } from "tamagui";
import { Asset } from "expo-asset";
import MapView, { Marker } from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../src/constants/location";
import { useAuth } from "../src/contexts/AuthContext.web";
import { useRouter } from "expo-router";

export default function MapScreen() {
  const [isReady, setIsReady] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
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
    <YStack flex={1}>
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
          icon={require("./assets/images/pin.png")}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </MapView>
      {user && (
        <YStack
          position="absolute"
          top={60}
          right={20}
          backgroundColor="$backgroundTransparent"
          padding="$3"
          borderRadius="$3"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
        >
          <Text fontSize="$3" marginBottom="$2">
            ようこそ、{user.name || user.email}!
          </Text>
          <Button
            size="$3"
            backgroundColor="$red10"
            onPress={logout}
            pressStyle={{ opacity: 0.8 }}
          >
            <Text color="white" fontSize="$3" fontWeight="500">
              ログアウト
            </Text>
          </Button>
        </YStack>
      )}
    </YStack>
  );
}

/**
 *
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("./assets/images/pin.png")].map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}