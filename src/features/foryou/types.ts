import type {UserNewsResource} from '@core/domain';

export type ForYouFeedState = 'Loading' | 'Success' | 'Empty';

export interface ForYouUiState {
  readonly feedState: ForYouFeedState;
  readonly feed: readonly UserNewsResource[];
  readonly isOnboarding: boolean;
  readonly isSyncing: boolean;
  readonly deepLinkedNewsId: string | null;
}

/** Hook contract — implemented in Phase 8. */
export interface ForYouViewModel {
  readonly uiState: ForYouUiState;
  onTopicFollowClick(topicId: string, isFollowed: boolean): void;
  onOnboardingDone(): void;
  onBookmarkClick(newsResource: UserNewsResource): void;
  onNewsResourceViewed(newsResourceId: string): void;
  onDeepLinkConsumed(): void;
  requestNotificationPermission(): void;
}
