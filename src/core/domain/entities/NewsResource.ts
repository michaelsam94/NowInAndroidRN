import type {Topic} from './Topic';

/** ISO-8601 instant string (maps Kotlin kotlinx.datetime.Instant). */
export type InstantString = string;

export interface NewsResource {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly url: string;
  readonly headerImageUrl: string | null;
  readonly publishDate: InstantString;
  readonly type: string;
  readonly topics: readonly Topic[];
}
