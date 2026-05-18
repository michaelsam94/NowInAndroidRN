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

export function mapNewsResourceDto(
  dto: NetworkNewsResourceDto,
  topicsById: ReadonlyMap<string, Topic>,
): NewsResource {
  const topics = dto.topics
    .map(topicId => topicsById.get(topicId))
    .filter((topic): topic is Topic => topic !== undefined);

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
