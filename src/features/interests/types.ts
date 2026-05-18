import type {FollowableTopic, Topic} from '@core/domain';

export interface InterestsUiState {
  readonly topics: readonly FollowableTopic[];
  readonly selectedTopicId: string | null;
  readonly selectedTopic: Topic | null;
}

export interface InterestsViewModel {
  readonly uiState: InterestsUiState;
  onTopicClick(topicId: string): void;
  onFollowClick(topicId: string, isFollowed: boolean): void;
}
