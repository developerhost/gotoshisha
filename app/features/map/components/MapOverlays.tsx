/**
 * マップ上のオーバーレイ要素（ユーザー情報、エラー情報、店舗数）を管理するコンポーネント
 */
import { YStack, Text, Button, XStack } from "tamagui";
import type { MapOverlaysProps } from "../types";

export function MapOverlays({
  user,
  shops,
  error,
  locationError,
  canRequestPermission,
  hasLocationPermission,
  isUsingCollectedShops,
  logout,
  retryLocationRequest,
  openSettings,
}: MapOverlaysProps) {
  return (
    <>
      {/* ユーザー情報オーバーレイ */}
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

      {/* 位置情報エラーオーバーレイ */}
      {error && (
        <YStack
          position="absolute"
          top={60}
          left={20}
          backgroundColor="$orange3"
          padding="$3"
          borderRadius="$3"
          borderWidth={1}
          borderColor="$orange8"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
          maxWidth="70%"
        >
          <Text fontSize="$2" color="$orange11" textAlign="left">
            {typeof error === "string" ? error : error.message}
            {locationError && !canRequestPermission && (
              <Text fontSize="$2" color="$gray10">
                {"\n"}
                設定で権限を許可してアプリに戻ると、自動的に再試行されます。
              </Text>
            )}
          </Text>
          {locationError && (
            <XStack gap="$2" marginTop="$2">
              {canRequestPermission ? (
                <Button
                  size="$2"
                  backgroundColor="$orange8"
                  onPress={retryLocationRequest}
                >
                  <Text color="white" fontSize="$2">
                    再試行
                  </Text>
                </Button>
              ) : (
                <Button
                  size="$2"
                  backgroundColor="$blue8"
                  onPress={openSettings}
                >
                  <Text color="white" fontSize="$2">
                    設定で許可
                  </Text>
                </Button>
              )}
            </XStack>
          )}
        </YStack>
      )}

      {/* 店舗数表示オーバーレイ */}
      <YStack
        position="absolute"
        top={60}
        left={20}
        backgroundColor="$backgroundTransparent"
        padding="$3"
        borderRadius="$3"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        elevation={5}
      >
        <Text fontSize="$3" color="$gray12">
          📍 {shops.length}件の店舗を表示中
          {hasLocationPermission ? (
            <Text fontSize="$2" color="$gray10">
              {isUsingCollectedShops
                ? "\n(マップ移動で収集した店舗を表示)"
                : "\n(現在地から20km圏内)"}
            </Text>
          ) : (
            <Text fontSize="$2" color="$gray10">
              {"\n"}(全店舗表示中・位置情報なし)
            </Text>
          )}
        </Text>
      </YStack>
    </>
  );
}
