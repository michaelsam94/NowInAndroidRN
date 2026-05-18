import {useCallback, useMemo, useState} from 'react';

import {
  completeBookmark,
  emptyUserData,
  removeBookmark,
  TopicSortField,
  type FollowableTopic,
  type UserNewsResource,
} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';
import {useAppStore} from '@store/index';

import type {ForYouFeedState, ForYouUiState, ForYouViewModel, ForYouViewModelDeps} from '../types';

export interface ForYouViewModelExtended extends ForYouViewModel {
  readonly pendingBookmarkId: string | null;
  readonly onboardingTopics: readonly FollowableTopic[];
  confirmPendingBookmark(note: string | null): void;
  dismissPendingBookmark(): void;
}

export function useForYouViewModel(deps: ForYouViewModelDeps): ForYouViewModelExtended {
  const isSyncing = useAppStore(state => state.isSyncing);
  const deepLinkedNewsId = useAppStore(state => state.deepLinkedNewsId);
  const setDeepLinkedNewsId = useAppStore(state => state.setDeepLinkedNewsId);
  const [pendingBookmarkId, setPendingBookmarkId] = useState<string | null>(null);

  const userData = useObservable(deps.userDataRepository.userData, emptyUserData);
  const feedObservable = useMemo(
    () => deps.getUserNewsResources.observeForFollowedTopics(),
    [deps.getUserNewsResources],
  );
  const feed = useObservable(feedObservable, []);
  const onboardingTopicsObservable = useMemo(
    () => deps.getFollowableTopics.invoke(TopicSortField.Name),
    [deps.getFollowableTopics],
  );
  const onboardingTopics = useObservable(onboardingTopicsObservable, []);

  const feedState: ForYouFeedState = feed.length === 0 ? 'Empty' : 'Success';

  const uiState: ForYouUiState = useMemo(
    () => ({
      feedState,
      feed,
      isOnboarding: !userData.shouldHideOnboarding,
      isSyncing,
      deepLinkedNewsId,
    }),
    [feed, feedState, userData.shouldHideOnboarding, isSyncing, deepLinkedNewsId],
  );

  const clearDeepLinkIfMatches = useCallback(
    (newsResourceId: string) => {
      if (newsResourceId === deepLinkedNewsId) {
        setDeepLinkedNewsId(null);
      }
    },
    [deepLinkedNewsId, setDeepLinkedNewsId],
  );

  const onTopicFollowClick = useCallback(
    (topicId: string, isFollowed: boolean) => {
      void deps.userDataRepository.setTopicIdFollowed(topicId, isFollowed);
    },
    [deps.userDataRepository],
  );

  const onOnboardingDone = useCallback(() => {
    void deps.userDataRepository.setShouldHideOnboarding(true);
    void deps.requestNotificationPermission();
  }, [deps]);

  const onBookmarkClick = useCallback(
    (newsResource: UserNewsResource) => {
      if (newsResource.isSaved) {
        void removeBookmark(deps.userDataRepository, newsResource.id);
      } else {
        setPendingBookmarkId(newsResource.id);
      }
    },
    [deps.userDataRepository],
  );

  const onNewsResourcePress = useCallback(
    (newsResource: UserNewsResource) => {
      if (newsResource.id === deepLinkedNewsId) {
        deps.logAnalyticsEvent({
          type: 'news_deep_link_opened',
          extras: [{key: 'linkedNewsResourceId', value: newsResource.id}],
        });
        clearDeepLinkIfMatches(newsResource.id);
      }
      void deps.openNewsArticle(newsResource.url);
      void deps.userDataRepository.setNewsResourceViewed(newsResource.id, true);
    },
    [clearDeepLinkIfMatches, deepLinkedNewsId, deps],
  );

  const confirmPendingBookmark = useCallback(
    (note: string | null) => {
      if (pendingBookmarkId === null) {
        return;
      }
      const id = pendingBookmarkId;
      setPendingBookmarkId(null);
      void completeBookmark(deps.userDataRepository, id, note);
    },
    [deps.userDataRepository, pendingBookmarkId],
  );

  const dismissPendingBookmark = useCallback(() => {
    confirmPendingBookmark(null);
  }, [confirmPendingBookmark]);

  return {
    uiState,
    onTopicFollowClick,
    onOnboardingDone,
    onBookmarkClick,
    onNewsResourcePress,
    onDeepLinkConsumed: () => setDeepLinkedNewsId(null),
    requestNotificationPermission: () => {
      void deps.requestNotificationPermission();
    },
    pendingBookmarkId,
    onboardingTopics,
    confirmPendingBookmark,
    dismissPendingBookmark,
  };
}
