import type {NewsResource, RecentSearchQuery, Topic} from '@core/domain';

import {createReplayObservable} from '../../util/replayObservable';
import type {LocalDataSource} from './LocalDataSource';

export class InMemoryLocalDataSource implements LocalDataSource {
  private topics: Topic[] = [];
  private newsResources: NewsResource[] = [];
  private recentSearches: RecentSearchQuery[] = [];

  private readonly topicsSubject = createReplayObservable<readonly Topic[]>([]);
  private readonly newsSubject = createReplayObservable<readonly NewsResource[]>(
    [],
  );
  private readonly recentSubject = createReplayObservable<
    readonly RecentSearchQuery[]
  >([]);

  observeTopics() {
    return this.topicsSubject.observable;
  }

  observeTopic(id: string) {
    return (emit: (value: Topic) => void) =>
      this.topicsSubject.observable(topics => {
        const topic = topics.find(item => item.id === id);
        if (topic !== undefined) {
          emit(topic);
        }
      });
  }

  observeNewsResources() {
    return this.newsSubject.observable;
  }

  observeRecentSearches(limit: number) {
    return (emit: (value: readonly RecentSearchQuery[]) => void) =>
      this.recentSubject.observable(searches => {
        emit(searches.slice(0, limit));
      });
  }

  async upsertTopics(topics: readonly Topic[]): Promise<void> {
    const map = new Map(this.topics.map(topic => [topic.id, topic]));
    topics.forEach(topic => map.set(topic.id, topic));
    this.topics = [...map.values()];
    this.topicsSubject.emit(this.topics);
  }

  async deleteTopics(ids: readonly string[]): Promise<void> {
    const idSet = new Set(ids);
    this.topics = this.topics.filter(topic => !idSet.has(topic.id));
    this.topicsSubject.emit(this.topics);
  }

  async upsertNewsResources(news: readonly NewsResource[]): Promise<void> {
    const map = new Map(this.newsResources.map(item => [item.id, item]));
    news.forEach(item => map.set(item.id, item));
    this.newsResources = [...map.values()];
    this.newsSubject.emit(this.newsResources);
  }

  async deleteNewsResources(ids: readonly string[]): Promise<void> {
    const idSet = new Set(ids);
    this.newsResources = this.newsResources.filter(item => !idSet.has(item.id));
    this.newsSubject.emit(this.newsResources);
  }

  async insertRecentSearch(query: string): Promise<void> {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return;
    }
    const entry: RecentSearchQuery = {
      query: trimmed,
      queriedDate: new Date().toISOString(),
    };
    this.recentSearches = [
      entry,
      ...this.recentSearches.filter(item => item.query !== trimmed),
    ].slice(0, 10);
    this.recentSubject.emit(this.recentSearches);
  }

  async clearRecentSearches(): Promise<void> {
    this.recentSearches = [];
    this.recentSubject.emit(this.recentSearches);
  }

  async searchNewsAndTopics(query: string): Promise<{
    topics: readonly Topic[];
    newsResources: readonly NewsResource[];
  }> {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) {
      return {topics: [], newsResources: []};
    }

    const topics = this.topics.filter(
      topic =>
        topic.name.toLowerCase().includes(normalized) ||
        topic.shortDescription.toLowerCase().includes(normalized) ||
        topic.longDescription.toLowerCase().includes(normalized),
    );

    const newsResources = this.newsResources.filter(
      item =>
        item.title.toLowerCase().includes(normalized) ||
        item.content.toLowerCase().includes(normalized),
    );

    return {topics, newsResources};
  }

  async isEmpty(): Promise<boolean> {
    return this.topics.length === 0 && this.newsResources.length === 0;
  }
}
