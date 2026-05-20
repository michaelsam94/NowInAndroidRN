import {act, renderHook, waitFor} from '@testing-library/react-native';

import {
  createGetRecentSearchQueriesUseCase,
  createGetSearchContentsUseCase,
} from '@core/domain';

import {
  TestRecentSearchRepository,
  TestSearchContentsRepository,
  TestUserDataRepository,
} from '../../../../../test/fakes';
import {sampleNewsCompose} from '../../../../../test/fixtures/sampleNewsResources';
import {sampleTopicCompose} from '../../../../../test/fixtures/sampleTopics';
import type {SearchViewModelDeps} from '../../types';
import {useSearchViewModel} from '../useSearchViewModel';

function createSearchDeps(
  searchRepository: TestSearchContentsRepository,
  recentSearchRepository: TestRecentSearchRepository,
  userDataRepository: TestUserDataRepository,
): SearchViewModelDeps {
  return {
    getSearchContents: createGetSearchContentsUseCase(
      searchRepository,
      userDataRepository,
    ),
    getRecentSearchQueries:
      createGetRecentSearchQueriesUseCase(recentSearchRepository),
    searchContentsRepository: searchRepository,
    recentSearchRepository,
    userDataRepository,
  };
}

describe('useSearchViewModel', () => {
  it('reports NotReady when the search index is empty', async () => {
    const deps = createSearchDeps(
      new TestSearchContentsRepository(),
      new TestRecentSearchRepository(),
      new TestUserDataRepository(),
    );

    const {result} = renderHook(() => useSearchViewModel(deps));

    await waitFor(() => {
      expect(result.current.uiState.screenState).toBe('NotReady');
      expect(result.current.uiState.result).toBeNull();
    });
  });

  it('shows Empty when the query matches nothing', async () => {
    const searchRepository = new TestSearchContentsRepository();
    searchRepository.setSearchContentsCount(5);
    searchRepository.setSearchResult('zz', {topics: [], newsResources: []});

    const deps = createSearchDeps(
      searchRepository,
      new TestRecentSearchRepository(),
      new TestUserDataRepository(),
    );

    const {result} = renderHook(() => useSearchViewModel(deps));

    act(() => {
      result.current.onQueryChange('zz');
    });

    await waitFor(() => {
      expect(result.current.uiState.screenState).toBe('Empty');
    });
  });

  it('returns search results when the query is long enough', async () => {
    const searchRepository = new TestSearchContentsRepository();
    searchRepository.setSearchContentsCount(3);
    searchRepository.setSearchResult('compose', {
      topics: [sampleTopicCompose],
      newsResources: [sampleNewsCompose],
    });

    const deps = createSearchDeps(
      searchRepository,
      new TestRecentSearchRepository(),
      new TestUserDataRepository(),
    );

    const {result} = renderHook(() => useSearchViewModel(deps));

    act(() => {
      result.current.onQueryChange('compose');
    });

    await waitFor(() => {
      expect(result.current.uiState.screenState).toBe('Ready');
      expect(result.current.uiState.result?.newsResources).toHaveLength(1);
      expect(result.current.uiState.result?.topics).toHaveLength(1);
    });
  });

  it('records recent search on onSearch', async () => {
    const recentSearchRepository = new TestRecentSearchRepository();
    const insertSpy = jest.spyOn(
      recentSearchRepository,
      'insertOrReplaceRecentSearch',
    );
    const searchRepository = new TestSearchContentsRepository();
    searchRepository.setSearchContentsCount(1);

    const deps = createSearchDeps(
      searchRepository,
      recentSearchRepository,
      new TestUserDataRepository(),
    );

    const {result} = renderHook(() => useSearchViewModel(deps));

    act(() => {
      result.current.onSearch('Kotlin');
    });

    await waitFor(() => {
      expect(result.current.uiState.query).toBe('Kotlin');
    });
    expect(insertSpy).toHaveBeenCalledWith('Kotlin');
  });
});
