import type {StateCreator} from 'zustand';

import type {RootStoreState} from './types';

export interface NetworkSliceActions {
  setIsOffline: (isOffline: boolean) => void;
}

export const createNetworkSlice: StateCreator<
  RootStoreState,
  [],
  [],
  Pick<RootStoreState, 'isOffline'> & NetworkSliceActions
> = set => ({
  isOffline: false,
  setIsOffline: isOffline => set({isOffline}),
});
