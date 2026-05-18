import type {
  FollowableTopic,
  GetFollowableTopicsUseCase,
  Topic,
  UserDataRepository,
} from '@core/domain';

export interface InterestsUiState {
  readonly topics: readonly FollowableTopic[];
  readonly selectedTopicId: string | null;
  readonly selectedTopic: Topic | null;
}

export interface InterestsViewModelDeps {
  readonly getFollowableTopics: GetFollowableTopicsUseCase;
  readonly userDataRepository: UserDataRepository;
}

export interface InterestsViewModel {
  readonly uiState: InterestsUiState;
  onTopicClick(topicId: string): void;
  onFollowClick(topicId: string, isFollowed: boolean): void;
}
