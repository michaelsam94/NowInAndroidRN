/** API DTO shapes matching Android NetworkResponse<T> wrappers. */

export interface NetworkResponse<T> {
  readonly data: T;
}

export interface NetworkTopicDto {
  readonly id: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly url: string;
  readonly imageUrl: string;
}

export interface NetworkNewsResourceDto {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly url: string;
  readonly headerImageUrl: string;
  readonly publishDate: string;
  readonly type: string;
  readonly topics: readonly string[];
}

export const sampleNetworkTopics: NetworkTopicDto[] = [
  {
    id: 'topic-compose',
    name: 'Compose',
    shortDescription: 'Compose short',
    longDescription: 'Compose long',
    url: 'https://example.com/topics/compose',
    imageUrl: 'https://example.com/images/compose.png',
  },
];

export const sampleNetworkNews: NetworkNewsResourceDto[] = [
  {
    id: 'news-1',
    title: 'Jetpack Compose 1.6',
    content: 'Compose content',
    url: 'https://example.com/news/1',
    headerImageUrl: 'https://example.com/news/1.png',
    publishDate: '2024-01-15T10:00:00Z',
    type: 'Article',
    topics: ['topic-compose'],
  },
];
