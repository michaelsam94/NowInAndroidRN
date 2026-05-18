import type {StateCreator} from 'zustand';

import type {RootStoreState} from './types';

export interface NavigationSliceActions {
  setUnreadForYou: (unread: boolean) => void;
  setUnreadBookmarks: (unread: boolean) => void;
  setUnreadInterests: (unread: boolean) => void;
}

export const createNavigationSlice: StateCreator<
  RootStoreState,
  [],
  [],
  Pick<
    RootStoreState,
    'unreadForYou' | 'unreadBookmarks' | 'unreadInterests'
  > &
    NavigationSliceActions
> = set => ({
  unreadForYou: false,
  unreadBookmarks: false,
  unreadInterests: false,
  setUnreadForYou: unreadForYou => set({unreadForYou}),
  setUnreadBookmarks: unreadBookmarks => set({unreadBookmarks}),
  setUnreadInterests: unreadInterests => set({unreadInterests}),
});
