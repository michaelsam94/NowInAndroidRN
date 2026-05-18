import type {FollowableTopic, UserNewsResource} from '@core/domain';

import {sampleNewsCompose} from './sampleNewsResources';
import {sampleTopicCompose, sampleTopicKotlin} from './sampleTopics';

const followableCompose: FollowableTopic = {
  topic: sampleTopicCompose,
  isFollowed: true,
};

const followableKotlin: FollowableTopic = {
  topic: sampleTopicKotlin,
  isFollowed: false,
};

export const sampleUserNewsRead: UserNewsResource = {
  id: 'news-read-1',
  title: 'Read article',
  content: 'Already viewed content',
  url: 'https://example.com/news/read',
  headerImageUrl: null,
  publishDate: '2024-02-10T12:00:00Z',
  type: 'Article',
  followableTopics: [followableCompose],
  isSaved: false,
  hasBeenViewed: true,
  note: null,
};

export const sampleUserNewsUnread: UserNewsResource = {
  ...sampleUserNewsRead,
  id: 'news-unread-1',
  title: 'Unread article',
  hasBeenViewed: false,
};

export const sampleUserNewsWithNote: UserNewsResource = {
  id: sampleNewsCompose.id,
  title: sampleNewsCompose.title,
  content: sampleNewsCompose.content,
  url: sampleNewsCompose.url,
  headerImageUrl: sampleNewsCompose.headerImageUrl,
  publishDate: sampleNewsCompose.publishDate,
  type: sampleNewsCompose.type,
  followableTopics: [followableCompose, followableKotlin],
  isSaved: true,
  hasBeenViewed: true,
  note: 'Hidden on feed cards',
};

export const sampleUserNewsEmptyType: UserNewsResource = {
  ...sampleUserNewsRead,
  id: 'news-no-type',
  type: '',
  publishDate: '2024-03-01T08:30:00Z',
};
