import type {Topic} from '@core/domain';

export const sampleTopicCompose: Topic = {
  id: 'topic-compose',
  name: 'Compose',
  shortDescription: 'Compose short',
  longDescription: 'Compose long',
  url: 'https://example.com/topics/compose',
  imageUrl: 'https://example.com/images/compose.png',
};

export const sampleTopicKotlin: Topic = {
  id: 'topic-kotlin',
  name: 'Kotlin',
  shortDescription: 'Kotlin short',
  longDescription: 'Kotlin long',
  url: 'https://example.com/topics/kotlin',
  imageUrl: 'https://example.com/images/kotlin.png',
};

export const sampleTopics: readonly Topic[] = [
  sampleTopicKotlin,
  sampleTopicCompose,
];
