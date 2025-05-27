import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="routes/map" 
        options={{ 
          title: "マップ",
          headerBackTitle: "戻る"
        }} 
      />
    </Stack>
  );
}
