import {Database} from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import {appSchema, tableSchema} from '@nozbe/watermelondb/Schema';

/**
 * Minimal schema for harness verification. Full NIA schema lands in Phase 5.
 */
export const testSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'recent_searches',
      columns: [
        {name: 'query', type: 'string'},
        {name: 'queried_at', type: 'number'},
      ],
    }),
  ],
});

export function createTestDatabase(): Database {
  const adapter = new LokiJSAdapter({
    schema: testSchema,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });

  return new Database({
    adapter,
    modelClasses: [],
  });
}
