import type {Topic} from './Topic';

export interface FollowableTopic {
  readonly topic: Topic;
  readonly isFollowed: boolean;
}
