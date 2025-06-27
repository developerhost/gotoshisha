import { apiClient } from '../../config/api';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
}

/**
 * ユーザープロフィールを取得
 */
export async function getUserProfile(
  userId: string, 
  token?: string,
  userInfo?: { email?: string; name?: string; picture?: string }
): Promise<UserProfile> {
  console.log('getUserProfile called with userId:', userId);
  console.log('User info provided:', userInfo);
  
  const options: { token?: string } = {};
  if (token) {
    options.token = token;
  }
  
  // ユーザー情報がある場合はPOSTを使用、ない場合はGETを使用
  const response = userInfo 
    ? await apiClient.post(`/api/profile/${userId}/get`, {
        json: { user: userInfo },
        ...options
      })
    : await apiClient.get(`/api/profile/${userId}`, options);
  
  console.log('API response status:', response.status);
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('API error:', errorData);
    throw new Error(errorData.error || 'プロフィールの取得に失敗しました');
  }
  
  const data = await response.json();
  console.log('Profile data:', data);
  return data;
}

/**
 * ユーザープロフィールを更新
 */
export async function updateUserProfile(
  userId: string,
  profile: UpdateProfileRequest,
  token?: string
): Promise<UserProfile> {
  console.log('updateUserProfile called with:', { userId, profile });
  const response = await apiClient.put(`/api/profile/${userId}`, {
    json: profile,
    token,
  });
  
  console.log('Update response status:', response.status);
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Update API error:', errorData);
    throw new Error(errorData.error || 'プロフィールの更新に失敗しました');
  }
  
  const data = await response.json();
  console.log('Updated profile data:', data);
  return data;
}
