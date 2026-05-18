import type {NewsResource} from '@core/domain';

import {sampleTopicCompose} from './sampleTopics';

export const sampleNewsCompose: NewsResource = {
  id: 'news-compose-1',
  title: 'Compose 1.6',
  content: 'Compose release notes',
  url: 'https://example.com/news/compose-1',
  headerImageUrl: 'https://example.com/news/compose-1.png',
  publishDate: '2024-01-15T10:00:00Z',
  type: 'Article',
  topics: [sampleTopicCompose],
};

export const sampleNewsResources: readonly NewsResource[] = [sampleNewsCompose];
