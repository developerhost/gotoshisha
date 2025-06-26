/**
 * 位置情報取得のカスタムフック
 */
import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { Linking, AppState } from 'react-native';
import { SHINJUKU_COORDINATE } from '../constants/location';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
  hasPermission: boolean;
  isUsingFallback: boolean; // フォールバック位置（新宿）を使用しているかどうか
  canRequestPermission: boolean; // 権限を再要求できるかどうか
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
    hasPermission: false,
    isUsingFallback: false,
    canRequestPermission: true,
  });

  // 設定画面を開く関数
  const openSettings = useCallback(async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('設定画面を開けませんでした:', error);
    }
  }, []);

  const requestLocation = useCallback(async () => {
    setLocation(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // まず現在の権限状態をチェック
      const currentPermissions = await Location.getForegroundPermissionsAsync();
      
      if (currentPermissions.status === 'denied' && !currentPermissions.canAskAgain) {
        // 権限が永続的に拒否されている場合は、設定画面への誘導メッセージを表示
        setLocation(prev => ({
          ...prev,
          latitude: SHINJUKU_COORDINATE.latitude,
          longitude: SHINJUKU_COORDINATE.longitude,
          isLoading: false,
          hasPermission: false,
          isUsingFallback: true,
          canRequestPermission: false,
          error: '位置情報の権限が拒否されています。設定から権限を有効にしてください。新宿駅周辺を表示しています。',
        }));
        return;
      }

      // 権限をリクエスト
      const { status } = await Location.requestForegroundPermissionsAsync();

      // eslint-disable-next-line no-console
      console.log('位置情報の権限ステータス:', status);

      // 権限が完全に拒否された場合のみフォールバック
      if (status === 'denied') {
        setLocation(prev => ({
          ...prev,
          latitude: SHINJUKU_COORDINATE.latitude,
          longitude: SHINJUKU_COORDINATE.longitude,
          isLoading: false,
          hasPermission: false,
          isUsingFallback: true,
          canRequestPermission: currentPermissions.canAskAgain,
          error: currentPermissions.canAskAgain 
            ? '位置情報の権限が拒否されました。新宿駅周辺を表示しています。'
            : '位置情報の権限が拒否されています。設定から権限を有効にしてください。新宿駅周辺を表示しています。',
        }));
        return;
      }

      // granted または undetermined の場合は位置情報取得を試行
      // 「おおよそ」の場合も undetermined として扱われることがある

      let hasQuickLocation = false;

      // まずは高速で最後に知られた位置を取得
      try {
        const lastKnownLocation = await Location.getLastKnownPositionAsync({
          maxAge: 300000, // 5分以内のキャッシュを許可
          requiredAccuracy: 5000, // 「おおよそ」の場合を考慮して精度を緩和（5km以内）
        });

        // console.log('最後に知られた位置:', lastKnownLocation);

        if (lastKnownLocation) {
          // 最後に知られた位置をすぐに設定し、ローディングを解除
          setLocation({
            latitude: lastKnownLocation.coords.latitude,
            longitude: lastKnownLocation.coords.longitude,
            error: null,
            isLoading: false, // ここでローディング解除
            hasPermission: true,
            isUsingFallback: false,
            canRequestPermission: true,
          });
          hasQuickLocation = true;
        }
      } catch (lastKnownError) {
        // eslint-disable-next-line no-console
        console.log('最後に知られた位置の取得に失敗:', lastKnownError);
      }

      // バックグラウンドでより精密な現在位置を取得
      try {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low, // 「おおよそ」権限でも動作するよう精度を下げる
          timeInterval: 5000, // 5秒以内に取得
          distanceInterval: 100, // 100m以内の変化を検知
        });

        // console.log('現在位置:', currentLocation);

        // より精密な位置で更新（ローディングを確実に解除）
        setLocation(prev => ({
          ...prev,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          error: null,
          isLoading: false, // 現在位置取得成功時にローディング確実に解除
          hasPermission: true,
          isUsingFallback: false,
          canRequestPermission: true,
        }));
      } catch (currentLocationError) {
        // 精密な位置取得に失敗した場合、大まかな位置があればエラーにしない
        if (!hasQuickLocation) {
          setLocation(prev => ({
            ...prev,
            latitude: SHINJUKU_COORDINATE.latitude,
            longitude: SHINJUKU_COORDINATE.longitude,
            isLoading: false,
            isUsingFallback: true,
            canRequestPermission: true,
            error: '位置情報の取得に失敗しました。新宿駅周辺を表示しています。',
          }));
        }
        // eslint-disable-next-line no-console
        console.log('精密な位置の取得に失敗:', currentLocationError);
      }

    } catch (error) {
      setLocation(prev => ({
        ...prev,
        latitude: SHINJUKU_COORDINATE.latitude,
        longitude: SHINJUKU_COORDINATE.longitude,
        isLoading: false,
        isUsingFallback: true,
        canRequestPermission: true,
        error: error instanceof Error ? error.message : '位置情報の取得に失敗しました。新宿駅周辺を表示しています。',
      }));
    }
  }, []);

  // 権限の状態をチェックし、可能であれば最後に知られた位置を取得
  const checkPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      // granted または undetermined の場合は権限ありとして扱う
      const hasPermission = status === 'granted' || status === 'undetermined';
      
      setLocation(prev => ({
        ...prev,
        hasPermission,
      }));

      // 権限がある場合は、最後に知られた位置を自動取得
      if (hasPermission) {
        try {
          const lastKnownLocation = await Location.getLastKnownPositionAsync({
            maxAge: 600000, // 10分以内のキャッシュを許可
            requiredAccuracy: 10000, // 「おおよそ」を考慮して精度を大幅に緩和（10km以内）
          });

          // console.log('初期化時の最後に知られた位置:', lastKnownLocation);

          if (lastKnownLocation) {
            setLocation(prev => ({
              ...prev,
              latitude: lastKnownLocation.coords.latitude,
              longitude: lastKnownLocation.coords.longitude,
              isUsingFallback: false,
              canRequestPermission: true,
            }));
          }
        } catch (lastKnownError) {
          // eslint-disable-next-line no-console
          console.log('初期化時の最後に知られた位置の取得に失敗:', lastKnownError);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('位置情報権限の確認に失敗:', error);
    }
  };

  useEffect(() => {
    checkPermission();

    // アプリ状態の変化を監視
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'active') {
        // フォアグラウンドに戻ったときに権限状態をチェック
        const { status } = await Location.getForegroundPermissionsAsync();
        
        // 以前に権限が拒否されていて、現在は許可されている場合は自動再試行
        if (status === 'granted' && (!location.hasPermission || location.isUsingFallback)) {
          // 少し遅延を入れてから再試行（設定画面からの復帰を確実にするため）
          setTimeout(() => {
            requestLocation();
          }, 500);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [location.hasPermission, location.isUsingFallback, requestLocation]);

  return {
    ...location,
    requestLocation,
    checkPermission,
    openSettings,
  };
};
