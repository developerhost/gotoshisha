import { StyleSheet, Text, View } from "react-native";

/**
 * マップ画面（Web専用）
 * - Webでは未対応メッセージを表示
 */
export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        マップ機能はWebではサポートされていません
      </Text>
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
});
