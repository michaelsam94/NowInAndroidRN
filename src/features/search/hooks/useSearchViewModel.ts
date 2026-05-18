import {useCallback, useMemo, useState} from 'react';

import {
  SEARCH_QUERY_MIN_LENGTH,
  type UserSearchResult,
} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';

import type {
  SearchScreenState,
  SearchUiState,
  SearchViewModel,
  SearchViewModelDeps,
} from '../types';

const emptySearchResult: UserSearchResult = {topics: [], newsResources: []};
const SEARCH_MIN_INDEX_COUNT = 1;

export function useSearchViewModel(deps: SearchViewModelDeps): SearchViewModel {
  const [query, setQuery] = useState('');

  const recentObservable = useMemo(
    () => deps.getRecentSearchQueries.invoke(),
    [deps.getRecentSearchQueries],
  );
  const recentQueries = useObservable(recentObservable, []);

  const indexCountObservable = useMemo(
    () => deps.searchContentsRepository.getSearchContentsCount(),
    [deps.searchContentsRepository],
  );
  const indexCount = useObservable(indexCountObservable, 0);

  const searchObservable = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < SEARCH_QUERY_MIN_LENGTH) {
      return (emit: (value: UserSearchResult) => void) => {
        emit(emptySearchResult);
        return () => undefined;
      };
    }
    return deps.getSearchContents.invoke(trimmed);
  }, [deps.getSearchContents, query]);

  const result = useObservable(searchObservable, emptySearchResult);

  const screenState: SearchScreenState = useMemo(() => {
    if (indexCount < SEARCH_MIN_INDEX_COUNT) {
      return 'NotReady';
    }
    const trimmed = query.trim();
    if (trimmed.length < SEARCH_QUERY_MIN_LENGTH) {
      return 'Ready';
    }
    if (
      result.topics.length === 0 &&
      result.newsResources.length === 0
    ) {
      return 'Empty';
    }
    return 'Ready';
  }, [indexCount, query, result]);

  const uiState: SearchUiState = useMemo(
    () => ({
      screenState,
      query,
      result: query.trim().length >= SEARCH_QUERY_MIN_LENGTH ? result : null,
      recentQueries,
    }),
    [query, recentQueries, result, screenState],
  );

  const onQueryChange = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
  }, []);

  const onSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      void deps.recentSearchRepository.insertOrReplaceRecentSearch(searchQuery);
    },
    [deps.recentSearchRepository],
  );

  const onRecentSearchClick = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const onClearRecentSearches = useCallback(() => {
    void deps.recentSearchRepository.clearRecentSearches();
  }, [deps.recentSearchRepository]);

  const onBookmarkResult = useCallback(
    (newsResourceId: string) => {
      void deps.userDataRepository.setNewsResourceBookmarked(newsResourceId, true);
    },
    [deps.userDataRepository],
  );

  return {
    uiState,
    onQueryChange,
    onSearch,
    onRecentSearchClick,
    onClearRecentSearches,
    onBookmarkResult,
  };
}
