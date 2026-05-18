import '@testing-library/jest-native/extend-expect';

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
