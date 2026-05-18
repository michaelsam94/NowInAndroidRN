import type {
  NewsResource,
  SearchContentsRepository,
  SearchResult,
  Topic,
} from '@core/domain';

import type {LocalDataSource} from '../datasources/local/LocalDataSource';
import {combineObservable, mapObservable} from '../util/observable';

function filterSearchResult(
  searchQuery: string,
  topics: readonly Topic[],
  newsResources: readonly NewsResource[],
): SearchResult {
  const normalized = searchQuery.trim().toLowerCase();
  if (normalized.length < 2) {
    return {topics: [], newsResources: []};
  }

  const filteredTopics = topics.filter(
    topic =>
      topic.name.toLowerCase().includes(normalized) ||
      topic.shortDescription.toLowerCase().includes(normalized) ||
      topic.longDescription.toLowerCase().includes(normalized),
  );

  const filteredNews = newsResources.filter(
    resource =>
      resource.title.toLowerCase().includes(normalized) ||
      resource.content.toLowerCase().includes(normalized),
  );

  return {topics: filteredTopics, newsResources: filteredNews};
}

export class DefaultSearchContentsRepository implements SearchContentsRepository {
  constructor(private readonly local: LocalDataSource) {}

  async populateFtsData(): Promise<void> {
    // WatermelonDB FTS population lands in a later phase; local search is live now.
  }

  searchContents(searchQuery: string) {
    return combineObservable(
      this.local.observeTopics(),
      this.local.observeNewsResources(),
      (topics, newsResources) =>
        filterSearchResult(searchQuery, topics, newsResources),
    );
  }

  getSearchContentsCount() {
    return mapObservable(
      combineObservable(
        this.local.observeTopics(),
        this.local.observeNewsResources(),
        (topics, newsResources) => topics.length + newsResources.length,
      ),
      count => count,
    );
  }
}
