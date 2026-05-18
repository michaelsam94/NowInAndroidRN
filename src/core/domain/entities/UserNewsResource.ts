import type {FollowableTopic} from './FollowableTopic';
import type {InstantString} from './NewsResource';
import type {NewsResource} from './NewsResource';
import type {UserData} from './UserData';

export interface UserNewsResource {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly url: string;
  readonly headerImageUrl: string | null;
  readonly publishDate: InstantString;
  readonly type: string;
  readonly followableTopics: readonly FollowableTopic[];
  readonly isSaved: boolean;
  readonly hasBeenViewed: boolean;
  readonly note: string | null;
}

export function mapToUserNewsResource(
  newsResource: NewsResource,
  userData: UserData,
): UserNewsResource {
  const seenTopicIds = new Set<string>();
  const followableTopics: FollowableTopic[] = [];
  for (const topic of newsResource.topics) {
    if (seenTopicIds.has(topic.id)) {
      continue;
    }
    seenTopicIds.add(topic.id);
    followableTopics.push({
      topic,
      isFollowed: userData.followedTopics.has(topic.id),
    });
  }

  return {
    id: newsResource.id,
    title: newsResource.title,
    content: newsResource.content,
    url: newsResource.url,
    headerImageUrl: newsResource.headerImageUrl,
    publishDate: newsResource.publishDate,
    type: newsResource.type,
    followableTopics,
    isSaved: userData.bookmarkedNewsResources.has(newsResource.id),
    hasBeenViewed: userData.viewedNewsResources.has(newsResource.id),
    note: userData.bookmarkNotes[newsResource.id] ?? null,
  };
}

export function mapToUserNewsResources(
  newsResources: readonly NewsResource[],
  userData: UserData,
): UserNewsResource[] {
  return newsResources.map(resource =>
    mapToUserNewsResource(resource, userData),
  );
}
