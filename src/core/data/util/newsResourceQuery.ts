import type {NewsResource, NewsResourceQuery} from '@core/domain';

export function filterNewsResources(
  newsResources: readonly NewsResource[],
  query: NewsResourceQuery,
): readonly NewsResource[] {
  return newsResources.filter(resource => {
    if (
      query.filterNewsIds !== null &&
      !query.filterNewsIds.has(resource.id)
    ) {
      return false;
    }

    if (query.filterTopicIds !== null) {
      const topicIds = resource.topics.map(topic => topic.id);
      const matchesTopic = [...query.filterTopicIds].some(topicId =>
        topicIds.includes(topicId),
      );
      if (!matchesTopic) {
        return false;
      }
    }

    return true;
  });
}
