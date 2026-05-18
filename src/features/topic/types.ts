import type {FollowableTopic, UserNewsResource} from '@core/domain';

export interface TopicUiState {
  readonly topic: FollowableTopic | null;
  readonly news: readonly UserNewsResource[];
  readonly isLoading: boolean;
}

export interface TopicViewModel {
  readonly uiState: TopicUiState;
  onFollowClick(isFollowed: boolean): void;
  onNewsResourceViewed(newsResourceId: string): void;
}
