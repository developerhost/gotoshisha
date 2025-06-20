export const auth0Config = {
  domain:
    process.env.EXPO_PUBLIC_AUTH0_DOMAIN ||
    (() => {
      throw new Error(
        "EXPO_PUBLIC_AUTH0_DOMAIN environment variable is required"
      );
    })(),
  clientId:
    process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID ||
    (() => {
      throw new Error(
        "EXPO_PUBLIC_AUTH0_CLIENT_ID environment variable is required"
      );
    })(),
};
