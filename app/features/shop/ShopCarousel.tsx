/**
 * 横スライド可能な店舗カルーセルコンポーネント
 */
import { useRef, useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { YStack, XStack } from "tamagui";
import type { Shop } from "../../types/api";
import { ShopCard } from "./ShopCard";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth - 40; // 左右20pxずつマージン
const CARD_SPACING = 16;

interface ShopCarouselProps {
  shops: Shop[];
  selectedShopIndex: number;
  onShopChange: (index: number) => void;
}

export function ShopCarousel({
  shops,
  selectedShopIndex,
  onShopChange,
}: ShopCarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(selectedShopIndex);

  /**
   * スクロール位置から現在のカードインデックスを計算する
   */
  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / (CARD_WIDTH + CARD_SPACING));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < shops.length) {
      setCurrentIndex(newIndex);
      onShopChange(newIndex);
    }
  };

  /**
   * 外部から選択されたインデックスに応じてスクロール位置を更新する
   */
  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current && index >= 0 && index < shops.length) {
      const offsetX = index * (CARD_WIDTH + CARD_SPACING);
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
      setCurrentIndex(index);
    }
  };

  // 外部からのインデックス変更に対応
  if (selectedShopIndex !== currentIndex) {
    scrollToIndex(selectedShopIndex);
  }

  if (shops.length === 0) {
    return null;
  }

  return (
    <YStack>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >
        {shops.map((shop, index) => (
          <XStack
            key={shop.id}
            marginRight={index < shops.length - 1 ? CARD_SPACING : 0}
          >
            <ShopCard shop={shop} width={CARD_WIDTH} />
          </XStack>
        ))}
      </ScrollView>

      {/* インジケーター */}
      {shops.length > 1 && (
        <XStack
          justifyContent="center"
          alignItems="center"
          gap="$2"
          marginTop="$3"
          marginBottom="$2"
        >
          {shops.map((_, index) => (
            <XStack
              key={index}
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={index === currentIndex ? "$blue10" : "$gray5"}
            />
          ))}
        </XStack>
      )}
    </YStack>
  );
}
