import {Platform} from 'react-native';

export type NotificationPermissionStatus = 'granted' | 'denied' | 'unavailable';

/**
 * Requests POST_NOTIFICATIONS on Android 13+ via expo-notifications when available.
 * Returns `unavailable` in environments without the native module (e.g. Jest).
 */
export async function requestNotificationPermission(): Promise<NotificationPermissionStatus> {
  if (Platform.OS !== 'android') {
    return 'unavailable';
  }

  try {
    const Notifications = await import('expo-notifications');
    const {status: existing} = await Notifications.getPermissionsAsync();
    if (existing === Notifications.PermissionStatus.GRANTED) {
      return 'granted';
    }
    const {status} = await Notifications.requestPermissionsAsync();
    return status === Notifications.PermissionStatus.GRANTED ? 'granted' : 'denied';
  } catch {
    return 'unavailable';
  }
}
