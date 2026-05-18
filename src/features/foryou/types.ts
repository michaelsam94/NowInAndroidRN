import type {
  GetFollowableTopicsUseCase,
  GetUserNewsResourcesUseCase,
  UserDataRepository,
  UserNewsResource,
} from '@core/domain';

export type ForYouFeedState = 'Loading' | 'Success' | 'Empty';

export interface ForYouUiState {
  readonly feedState: ForYouFeedState;
  readonly feed: readonly UserNewsResource[];
  readonly isOnboarding: boolean;
  readonly isSyncing: boolean;
  readonly deepLinkedNewsId: string | null;
}

/** Dependencies injected into the Phase 8 `useForYouViewModel` hook. */
export interface ForYouViewModelDeps {
  readonly getUserNewsResources: GetUserNewsResourcesUseCase;
  readonly getFollowableTopics: GetFollowableTopicsUseCase;
  readonly userDataRepository: UserDataRepository;
}

export interface ForYouViewModel {
  readonly uiState: ForYouUiState;
  onTopicFollowClick(topicId: string, isFollowed: boolean): void;
  onOnboardingDone(): void;
  onBookmarkClick(newsResource: UserNewsResource): void;
  onNewsResourceViewed(newsResourceId: string): void;
  onDeepLinkConsumed(): void;
  requestNotificationPermission(): void;
}
