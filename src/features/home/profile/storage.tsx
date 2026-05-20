import AsyncStorage from '@react-native-async-storage/async-storage';

const AVATAR_KEY = 'user_avatar_uri';

export async function saveAvatarUri(uri: string | null): Promise<void> {
  try {
    if (uri) {
      await AsyncStorage.setItem(AVATAR_KEY, uri);
    } else {
      await AsyncStorage.removeItem(AVATAR_KEY);
    }
  } catch (e) {
    console.warn('Failed to save avatar URI:', e);
  }
}

export async function loadAvatarUri(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(AVATAR_KEY);
  } catch (e) {
    console.warn('Failed to load avatar URI:', e);
    return null;
  }
}
