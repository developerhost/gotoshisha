/**
 * 個別の店舗カードコンポーネント
 */
import { XStack, YStack, Text, Image } from "tamagui";
import type { Shop } from "../../types/api";
import { formatAddress, formatBudget, parsePhotos } from "./utils";

const defaultShishaImage = require("../../assets/images/default_shisha.png");

interface ShopCardProps {
  shop: Shop;
  width: number;
}

export function ShopCard({ shop, width }: ShopCardProps) {
  const photoUrls = parsePhotos(shop.photos);

  return (
    <XStack
      width={width}
      height={70}
      backgroundColor="$background"
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={3}
      overflow="hidden"
    >
      {/* 店舗画像 */}
      <YStack width={70}>
        {photoUrls.length > 0 ? (
          <Image
            source={{ uri: photoUrls[0] }}
            width={70}
            height={70}
            backgroundColor="$gray3"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={defaultShishaImage}
            width={70}
            height={70}
            backgroundColor="$gray3"
            resizeMode="cover"
          />
        )}
      </YStack>

      {/* 店舗情報 */}
      <YStack flex={1} padding="$2" justifyContent="center">
        {/* 店舗名 */}
        <Text
          fontSize="$4"
          fontWeight="bold"
          numberOfLines={1}
          marginBottom="$1"
        >
          {shop.name}
        </Text>

        {/* 住所と予算を1行で表示 */}
        <XStack alignItems="center" justifyContent="space-between" gap="$2">
          <XStack alignItems="center" gap="$1" flex={1}>
            <Text fontSize="$2" color="$gray8">
              📍
            </Text>
            <Text fontSize="$2" color="$gray11" numberOfLines={1} flex={1}>
              {formatAddress(shop.address)}
            </Text>
          </XStack>
          <Text fontSize="$2" color="$green10" fontWeight="600">
            {formatBudget(shop.budgetMin, shop.budgetMax)}
          </Text>
        </XStack>

        {/* 最寄り駅と設備アイコンを1行で表示 */}
        <XStack
          alignItems="center"
          justifyContent="space-between"
          gap="$2"
          marginTop="$1"
        >
          {shop.nearestStation ? (
            <XStack alignItems="center" gap="$1" flex={1}>
              <Text fontSize="$2" color="$gray8">
                🚃
              </Text>
              <Text fontSize="$2" color="$blue10" numberOfLines={1} flex={1}>
                {shop.nearestStation}
                {shop.stationWalkTime && ` ${shop.stationWalkTime}分`}
              </Text>
            </XStack>
          ) : (
            <XStack flex={1} />
          )}

          {/* 設備アイコン */}
          <XStack gap="$1" alignItems="center">
            {shop.wifi && <Text fontSize="$2">📶</Text>}
            {shop.powerOutlet && <Text fontSize="$2">🔌</Text>}
          </XStack>
        </XStack>
      </YStack>
    </XStack>
  );
}
