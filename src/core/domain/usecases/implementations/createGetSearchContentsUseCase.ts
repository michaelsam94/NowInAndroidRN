import type {SearchResult} from '../../entities/SearchResult';
import type {UserData} from '../../entities/UserData';
import {mapToUserSearchResult} from '../../entities/UserSearchResult';
import type {SearchContentsRepository} from '../../repositories/SearchContentsRepository';
import type {UserDataRepository} from '../../repositories/UserDataRepository';
import type {Observable} from '../../types/Observable';
import type {UserSearchResult} from '../../entities/UserSearchResult';
import type {GetSearchContentsUseCase} from '../GetSearchContentsUseCase';

export function createGetSearchContentsUseCase(
  searchContentsRepository: SearchContentsRepository,
  userDataRepository: UserDataRepository,
): GetSearchContentsUseCase {
  return {
    invoke(searchQuery: string): Observable<UserSearchResult> {
      return emit => {
        let userData: UserData | undefined;
        let searchResult: SearchResult | undefined;

        const tryEmit = (): void => {
          if (userData === undefined || searchResult === undefined) {
            return;
          }
          emit(mapToUserSearchResult(searchResult, userData));
        };

        const unsubscribeSearch = searchContentsRepository.searchContents(
          searchQuery,
        )(value => {
          searchResult = value;
          tryEmit();
        });
        const unsubscribeUser = userDataRepository.userData(value => {
          userData = value;
          tryEmit();
        });

        return () => {
          unsubscribeSearch?.();
          unsubscribeUser?.();
        };
      };
    },
  };
}
