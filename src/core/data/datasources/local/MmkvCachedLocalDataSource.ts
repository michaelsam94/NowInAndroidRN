import type {NewsResource, Topic} from '@core/domain';

import type {KeyValueStorage} from '../mmkv/UserPreferencesDataSource';
import {InMemoryLocalDataSource} from './InMemoryLocalDataSource';
import type {LocalDataSource} from './LocalDataSource';

const TOPICS_CACHE_KEY = 'nia.cache.topics.v1';
const NEWS_CACHE_KEY = 'nia.cache.news.v1';

function dedupeNewsResourceTopics(news: readonly NewsResource[]): NewsResource[] {
  return news.map(item => {
    const seen = new Set<string>();
    const topics = item.topics.filter(topic => {
      if (seen.has(topic.id)) {
        return false;
      }
      seen.add(topic.id);
      return true;
    });
    return topics.length === item.topics.length ? item : {...item, topics};
  });
}

/**
 * Offline cache for topics and news (survives process restarts).
 * Recent searches stay in memory only.
 */
export class MmkvCachedLocalDataSource implements LocalDataSource {
  private readonly inner = new InMemoryLocalDataSource();

  constructor(private readonly storage: KeyValueStorage) {
    this.hydrateFromCache();
  }

  private hydrateFromCache(): void {
    const topicsRaw = this.storage.getString(TOPICS_CACHE_KEY);
    if (topicsRaw !== undefined) {
      try {
        const topics = JSON.parse(topicsRaw) as Topic[];
        if (topics.length > 0) {
          void this.inner.upsertTopics(topics);
        }
      } catch {
        this.storage.set(TOPICS_CACHE_KEY, '[]');
      }
    }

    const newsRaw = this.storage.getString(NEWS_CACHE_KEY);
    if (newsRaw !== undefined) {
      try {
        const news = dedupeNewsResourceTopics(
          JSON.parse(newsRaw) as NewsResource[],
        );
        if (news.length > 0) {
          void this.inner.upsertNewsResources(news);
        }
      } catch {
        this.storage.set(NEWS_CACHE_KEY, '[]');
      }
    }
  }

  private persistTopicsCache(): void {
    this.storage.set(
      TOPICS_CACHE_KEY,
      JSON.stringify(this.inner.getTopicsSnapshot()),
    );
  }

  private persistNewsCache(): void {
    this.storage.set(
      NEWS_CACHE_KEY,
      JSON.stringify(this.inner.getNewsResourcesSnapshot()),
    );
  }

  observeTopics() {
    return this.inner.observeTopics();
  }

  observeTopic(id: string) {
    return this.inner.observeTopic(id);
  }

  observeNewsResources() {
    return this.inner.observeNewsResources();
  }

  observeRecentSearches(limit: number) {
    return this.inner.observeRecentSearches(limit);
  }

  async upsertTopics(topics: readonly Topic[]): Promise<void> {
    await this.inner.upsertTopics(topics);
    this.persistTopicsCache();
  }

  async deleteTopics(ids: readonly string[]): Promise<void> {
    await this.inner.deleteTopics(ids);
    this.persistTopicsCache();
  }

  async upsertNewsResources(news: readonly NewsResource[]): Promise<void> {
    await this.inner.upsertNewsResources(dedupeNewsResourceTopics(news));
    this.persistNewsCache();
  }

  async deleteNewsResources(ids: readonly string[]): Promise<void> {
    await this.inner.deleteNewsResources(ids);
    this.persistNewsCache();
  }

  async insertRecentSearch(query: string): Promise<void> {
    await this.inner.insertRecentSearch(query);
  }

  async clearRecentSearches(): Promise<void> {
    await this.inner.clearRecentSearches();
  }

  async searchNewsAndTopics(query: string): Promise<{
    topics: readonly Topic[];
    newsResources: readonly NewsResource[];
  }> {
    return this.inner.searchNewsAndTopics(query);
  }

  async isEmpty(): Promise<boolean> {
    return this.inner.isEmpty();
  }
}
