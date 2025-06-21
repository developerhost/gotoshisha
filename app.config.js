import { GOOGLE_API_KEY } from "react-native-dotenv";

export default ({ config }) => {
  return {
    plugins: [
      "expo-router",
      /*[
        "react-native-maps",
        {
          iosGoogleMapsApiKey: GOOGLE_API_KEY,
          androidGoogleMapsApiKey: GOOGLE_API_KEY,
        },
      ],*/
    ],
    ...config,
  };
};
