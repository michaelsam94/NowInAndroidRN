import type {FollowableTopic} from './FollowableTopic';
import type {UserNewsResource} from './UserNewsResource';

export interface UserSearchResult {
  readonly topics: readonly FollowableTopic[];
  readonly newsResources: readonly UserNewsResource[];
}
