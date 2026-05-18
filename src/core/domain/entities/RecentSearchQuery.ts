import type {InstantString} from './NewsResource';

export interface RecentSearchQuery {
  readonly query: string;
  readonly queriedDate: InstantString;
}
