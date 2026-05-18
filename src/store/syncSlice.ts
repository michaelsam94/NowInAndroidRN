import type {StateCreator} from 'zustand';

import type {RootStoreState} from './types';

export interface SyncSliceActions {
  setIsSyncing: (isSyncing: boolean) => void;
}

export const createSyncSlice: StateCreator<
  RootStoreState,
  [],
  [],
  Pick<RootStoreState, 'isSyncing'> & SyncSliceActions
> = set => ({
  isSyncing: false,
  setIsSyncing: isSyncing => set({isSyncing}),
});
