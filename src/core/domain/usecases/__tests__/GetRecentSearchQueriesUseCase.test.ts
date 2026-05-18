import {createGetRecentSearchQueriesUseCase} from '../implementations/createGetRecentSearchQueriesUseCase';
import {DEFAULT_RECENT_SEARCH_LIMIT} from '../GetRecentSearchQueriesUseCase';
import {onceObservable} from '../../../../../test/utils/observable';
import {TestRecentSearchRepository} from '../../../../../test/fakes/TestRecentSearchRepository';

describe('GetRecentSearchQueriesUseCase', () => {
  it('returns recent queries from the repository with default limit', async () => {
    const repository = new TestRecentSearchRepository();
    const queries = [
      {query: 'Compose', queriedDate: '2024-01-01T00:00:00Z'},
      {query: 'Kotlin', queriedDate: '2024-01-02T00:00:00Z'},
    ];
    repository.setRecentSearches(queries);

    const useCase = createGetRecentSearchQueriesUseCase(repository);
    const result = await onceObservable(useCase.invoke());

    expect(result).toEqual(queries);
    expect(DEFAULT_RECENT_SEARCH_LIMIT).toBe(10);
  });
});
