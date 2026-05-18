export interface NewsResourceQuery {
  /** Topic ids to filter for. null = any topic. */
  readonly filterTopicIds: ReadonlySet<string> | null;
  /** News ids to filter for. null = any news id. */
  readonly filterNewsIds: ReadonlySet<string> | null;
}

export const emptyNewsResourceQuery: NewsResourceQuery = {
  filterTopicIds: null,
  filterNewsIds: null,
};
