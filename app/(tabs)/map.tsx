import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>マップから探す</Text>
      <MapView style={styles.map} />
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
  map: {
    flex: 1,
  },
});
