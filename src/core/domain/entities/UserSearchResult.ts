import type {FollowableTopic} from './FollowableTopic';
import type {SearchResult} from './SearchResult';
import type {UserData} from './UserData';
import type {UserNewsResource} from './UserNewsResource';
import {mapToUserNewsResource} from './UserNewsResource';

export interface UserSearchResult {
  readonly topics: readonly FollowableTopic[];
  readonly newsResources: readonly UserNewsResource[];
}

export function mapToUserSearchResult(
  searchResult: SearchResult,
  userData: UserData,
): UserSearchResult {
  return {
    topics: searchResult.topics.map(topic => ({
      topic,
      isFollowed: userData.followedTopics.has(topic.id),
    })),
    newsResources: searchResult.newsResources.map(newsResource =>
      mapToUserNewsResource(newsResource, userData),
    ),
  };
}
