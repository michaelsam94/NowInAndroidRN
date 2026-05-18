import type {
  FollowableTopic,
  GetFollowableTopicsUseCase,
  GetUserNewsResourcesUseCase,
  TopicsRepository,
  UserDataRepository,
  UserNewsResource,
} from '@core/domain';

export interface TopicUiState {
  readonly topic: FollowableTopic | null;
  readonly news: readonly UserNewsResource[];
  readonly isLoading: boolean;
}

export interface TopicViewModelDeps {
  readonly getUserNewsResources: GetUserNewsResourcesUseCase;
  readonly getFollowableTopics: GetFollowableTopicsUseCase;
  readonly topicsRepository: TopicsRepository;
  readonly userDataRepository: UserDataRepository;
}

export interface TopicViewModel {
  readonly uiState: TopicUiState;
  onFollowClick(isFollowed: boolean): void;
  onNewsResourceViewed(newsResourceId: string): void;
}
