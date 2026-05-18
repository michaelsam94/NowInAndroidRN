import type {StateCreator} from 'zustand';

import type {RootStoreState} from './types';

export interface DeepLinkSliceActions {
  setDeepLinkedNewsId: (newsResourceId: string | null) => void;
}

export const createDeepLinkSlice: StateCreator<
  RootStoreState,
  [],
  [],
  Pick<RootStoreState, 'deepLinkedNewsId'> & DeepLinkSliceActions
> = set => ({
  deepLinkedNewsId: null,
  setDeepLinkedNewsId: deepLinkedNewsId => set({deepLinkedNewsId}),
});
