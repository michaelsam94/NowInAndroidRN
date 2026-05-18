import '@testing-library/jest-native/extend-expect';

jest.mock('expo-linking', () => ({
  getInitialURL: jest.fn().mockResolvedValue(null),
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn().mockResolvedValue({isConnected: true}),
}));

jest.mock('expo-notifications', () => ({
  PermissionStatus: {GRANTED: 'granted', DENIED: 'denied'},
  getPermissionsAsync: jest.fn().mockResolvedValue({status: 'granted'}),
  requestPermissionsAsync: jest.fn().mockResolvedValue({status: 'granted'}),
}));

jest.mock('react-native-mmkv', () => {
  const storage = new Map<string, string | number | boolean>();
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      getString: (key: string) => {
        const value = storage.get(key);
        return typeof value === 'string' ? value : undefined;
      },
      set: (key: string, value: string | number | boolean) => {
        storage.set(key, value);
      },
      delete: (key: string) => {
        storage.delete(key);
      },
    })),
  };
});
