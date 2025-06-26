import { Sheet, YStack, XStack, Text, Button } from "tamagui";
import type { Shop } from "../types/api";

interface ShopDetailSheetProps {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShopDetailSheet({ shop, isOpen, onClose }: ShopDetailSheetProps) {
  const handleDetailPress = () => {
    if (shop) {
      // TODO: 将来的に店舗詳細画面に遷移
      // const router = useRouter();
      // router.push(`/shop/${shop.id}`);
      alert(`${shop.name}の詳細画面に遷移予定`);
    }
  };

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) onClose();
      }}
      snapPoints={[40, 60]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame padding="$4" backgroundColor="$background">
        <Sheet.Handle />
        {shop && (
          <YStack gap="$4">
            <YStack gap="$2">
              <Text fontSize="$6" fontWeight="bold">
                {shop.name}
              </Text>
              <Text fontSize="$4" color="$gray10">
                {shop.address}
              </Text>
            </YStack>

            {shop.nearestStation && (
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4" color="$blue10">
                  📍 {shop.nearestStation}
                </Text>
                {shop.stationWalkTime && (
                  <Text fontSize="$4" color="$gray10">
                    徒歩{shop.stationWalkTime}分
                  </Text>
                )}
              </XStack>
            )}

            {shop.budgetMin && shop.budgetMax && (
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4" color="$green10">
                  💰 ¥{shop.budgetMin.toLocaleString()} - ¥{shop.budgetMax.toLocaleString()}
                </Text>
              </XStack>
            )}

            <XStack gap="$3">
              {shop.wifi && (
                <Text fontSize="$3" color="$blue10" backgroundColor="$blue3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                  📶 WiFi
                </Text>
              )}
              {shop.powerOutlet && (
                <Text fontSize="$3" color="$orange10" backgroundColor="$orange3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                  🔌 電源
                </Text>
              )}
              {shop.privateBooking && (
                <Text fontSize="$3" color="$purple10" backgroundColor="$purple3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                  🏠 貸切可
                </Text>
              )}
            </XStack>

            {shop.reservation && (
              <Text fontSize="$3" color="$gray10">
                予約: {
                  shop.reservation === 'REQUIRED' ? '必須' :
                  shop.reservation === 'RECOMMENDED' ? '推奨' : '不要'
                }
              </Text>
            )}

            {shop.reviewCount !== undefined && shop.reviewCount > 0 && (
              <Text fontSize="$4" color="$orange10">
                ⭐ レビュー{shop.reviewCount}件
              </Text>
            )}

            <Button
              backgroundColor="$blue10"
              color="white"
              onPress={handleDetailPress}
            >
              詳細を見る
            </Button>
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
}
