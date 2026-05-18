import type {NewsResource, Topic} from '@core/domain';

import type {NetworkNewsResourceDto, NetworkTopicDto} from './network';

export function mapTopicDto(dto: NetworkTopicDto): Topic {
  return {
    id: dto.id,
    name: dto.name,
    shortDescription: dto.shortDescription,
    longDescription: dto.longDescription,
    url: dto.url,
    imageUrl: dto.imageUrl,
  };
}

function uniqueTopicsById(topicIds: readonly string[], topicsById: ReadonlyMap<string, Topic>): Topic[] {
  const seen = new Set<string>();
  const topics: Topic[] = [];

  for (const topicId of topicIds) {
    if (seen.has(topicId)) {
      continue;
    }
    const topic = topicsById.get(topicId);
    if (topic === undefined) {
      continue;
    }
    seen.add(topicId);
    topics.push(topic);
  }

  return topics;
}

export function mapNewsResourceDto(
  dto: NetworkNewsResourceDto,
  topicsById: ReadonlyMap<string, Topic>,
): NewsResource {
  const topics = uniqueTopicsById(dto.topics, topicsById);

  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    url: dto.url,
    headerImageUrl: dto.headerImageUrl.length > 0 ? dto.headerImageUrl : null,
    publishDate: dto.publishDate,
    type: dto.type,
    topics,
  };
}
