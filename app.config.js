export default ({ config }) => {
  return {
    plugins: [
      "expo-router",
      "expo-secure-store",
    ],
    ...config,
  };
};
