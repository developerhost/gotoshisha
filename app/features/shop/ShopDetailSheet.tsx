/**
 * 店舗詳細シート
 */
import { Sheet, YStack, XStack, Text, Image, ScrollView } from "tamagui";
import type { Shop } from "../../types/api";
import {
  formatAddress,
  parseOpeningHours,
  formatBudget,
  parsePhotos,
} from "./utils";

const defaultShishaImage = require("../../assets/images/default_shisha.png");

interface ShopDetailSheetProps {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShopDetailSheet({
  shop,
  isOpen,
  onClose,
}: ShopDetailSheetProps) {
  if (!shop) return null;

  const photoUrls = parsePhotos(shop.photos);

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
      snapPoints={[50]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame backgroundColor="$background">
        <Sheet.Handle marginBottom="$1" />
        <YStack paddingHorizontal="$3" paddingBottom="$1">
          <YStack gap="$3">
            {/* 店舗名 */}
            <Text fontSize="$7" fontWeight="bold" numberOfLines={1}>
              {shop.name}
            </Text>

            {/* メインコンテンツエリア */}
            <XStack gap="$3">
              {/* 左側：店舗画像 */}
              <YStack width={140}>
                {photoUrls.length > 0 ? (
                  <Image
                    source={{ uri: photoUrls[0] }}
                    width={140}
                    height={100}
                    borderRadius="$3"
                    backgroundColor="$gray3"
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={defaultShishaImage}
                    width={140}
                    height={100}
                    borderRadius="$3"
                    backgroundColor="$gray3"
                    resizeMode="cover"
                  />
                )}
                {photoUrls.length > 1 && (
                  <Text
                    fontSize="$2"
                    color="$gray10"
                    marginTop="$1"
                    textAlign="center"
                  >
                    他{photoUrls.length - 1}枚
                  </Text>
                )}
              </YStack>

              {/* 右側：基本情報 */}
              <YStack flex={1} gap="$2">
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$2" color="$gray8">
                    📍
                  </Text>
                  <Text fontSize="$3" color="$gray11" numberOfLines={2}>
                    {formatAddress(shop.address)}
                  </Text>
                </XStack>

                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$2" color="$gray8">
                    💰
                  </Text>
                  <Text fontSize="$3" color="$green10" fontWeight="600">
                    {formatBudget(shop.budgetMin, shop.budgetMax)}
                  </Text>
                </XStack>

                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$2" color="$gray8">
                    🕐
                  </Text>
                  <Text fontSize="$3" color="$gray11" numberOfLines={1}>
                    {parseOpeningHours(shop.openingHours)}
                  </Text>
                </XStack>

                {shop.nearestStation && (
                  <XStack alignItems="center" gap="$2">
                    <Text fontSize="$2" color="$gray8">
                      🚃
                    </Text>
                    <Text fontSize="$3" color="$blue10">
                      {shop.nearestStation}
                      {shop.stationWalkTime && ` 徒歩${shop.stationWalkTime}分`}
                    </Text>
                  </XStack>
                )}
              </YStack>
            </XStack>

            {/* 設備・サービスタグ */}
            <XStack gap="$2" flexWrap="wrap">
              {shop.wifi && (
                <XStack
                  backgroundColor="$blue2"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2">📶</Text>
                  <Text fontSize="$2" color="$blue10">
                    WiFi
                  </Text>
                </XStack>
              )}
              {shop.powerOutlet && (
                <XStack
                  backgroundColor="$orange2"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2">🔌</Text>
                  <Text fontSize="$2" color="$orange10">
                    電源
                  </Text>
                </XStack>
              )}
              {shop.privateBooking && (
                <XStack
                  backgroundColor="$purple2"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2">🏠</Text>
                  <Text fontSize="$2" color="$purple10">
                    貸切可
                  </Text>
                </XStack>
              )}
              {shop.reservation && (
                <XStack
                  backgroundColor="$gray2"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                  alignItems="center"
                  gap="$1"
                >
                  <Text fontSize="$2">📅</Text>
                  <Text fontSize="$2" color="$gray10">
                    予約
                    {shop.reservation === "REQUIRED"
                      ? "必須"
                      : shop.reservation === "RECOMMENDED"
                      ? "推奨"
                      : "不要"}
                  </Text>
                </XStack>
              )}
            </XStack>

            {/* その他の画像 */}
            {photoUrls.length > 1 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack gap="$2">
                  {photoUrls.slice(1, 6).map((url, index) => (
                    <Image
                      key={index + 1}
                      source={{ uri: url }}
                      width={80}
                      height={60}
                      borderRadius="$2"
                      backgroundColor="$gray3"
                      resizeMode="cover"
                    />
                  ))}
                </XStack>
              </ScrollView>
            )}

            {/* レビュー情報 */}
            {shop.reviewCount !== undefined && shop.reviewCount > 0 && (
              <XStack alignItems="center" gap="$2" paddingTop="$2">
                <Text fontSize="$3" color="$orange10">
                  ⭐
                </Text>
                <Text fontSize="$3" color="$gray11">
                  レビュー{shop.reviewCount}件
                </Text>
              </XStack>
            )}
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
