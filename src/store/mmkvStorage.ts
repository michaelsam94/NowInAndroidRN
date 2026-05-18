import {MMKV} from 'react-native-mmkv';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKV({id: 'nia-preferences'});

export const zustandMmkvStorage: StateStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};
