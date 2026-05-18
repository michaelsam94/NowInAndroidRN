import {createTestDatabase, testSchema} from '../createTestDatabase';

describe('WatermelonDB test harness', () => {
  it('declares recent_searches in the test schema', () => {
    expect(testSchema.version).toBe(1);
    expect(Object.keys(testSchema.tables)).toContain('recent_searches');
  });

  it('creates an in-memory LokiJS database', async () => {
    const database = createTestDatabase();
    expect(database).toBeDefined();
    await database.write(async () => {
      // no-op: verifies adapter is writable
    });
  });
});
