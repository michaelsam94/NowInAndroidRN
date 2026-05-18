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

export interface ForYouAnalyticsEvent {
  readonly type: string;
  readonly extras?: readonly {readonly key: string; readonly value: string}[];
}

/** Dependencies injected into the `useForYouViewModel` hook. */
export interface ForYouViewModelDeps {
  readonly getUserNewsResources: GetUserNewsResourcesUseCase;
  readonly getFollowableTopics: GetFollowableTopicsUseCase;
  readonly userDataRepository: UserDataRepository;
  readonly openNewsArticle: (url: string) => Promise<void>;
  readonly requestNotificationPermission: () => Promise<void>;
  readonly logAnalyticsEvent: (event: ForYouAnalyticsEvent) => void;
}

export interface ForYouViewModel {
  readonly uiState: ForYouUiState;
  onTopicFollowClick(topicId: string, isFollowed: boolean): void;
  onOnboardingDone(): void;
  onBookmarkClick(newsResource: UserNewsResource): void;
  onNewsResourcePress(newsResource: UserNewsResource): void;
  onDeepLinkConsumed(): void;
  requestNotificationPermission(): void;
}
