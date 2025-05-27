import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import MapView, { Marker } from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../constants/location";

export default function MapScreen() {
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
