import type {NewsResource} from './NewsResource';
import type {Topic} from './Topic';

export interface SearchResult {
  readonly topics: readonly Topic[];
  readonly newsResources: readonly NewsResource[];
}
