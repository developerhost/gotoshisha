import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useState, useEffect } from "react";

/**
 * マップ画面（iOS/Android専用）
 * - 地図を表示
 */
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>マップから探す</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 35.6895,
          longitude: 139.6917,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 35.6895, longitude: 139.6917 }}
          title="東京駅"
          description="日本の中心地"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: { flex: 1 },
});
