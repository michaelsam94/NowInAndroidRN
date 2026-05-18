/**
 * MSW handler contract tests (fixtures). Full HTTP integration runs in Node
 * scripts / Phase 5 API layer tests — jest-expo resolver limits msw/node.
 */
import {sampleNetworkNews, sampleNetworkTopics} from '../fixtures';

describe('NIA API fixtures', () => {
  it('provides sample topics for mock handlers', () => {
    expect(sampleNetworkTopics[0]?.name).toBe('Compose');
    expect(sampleNetworkTopics[0]?.id).toBe('topic-compose');
  });

  it('provides sample news resources for mock handlers', () => {
    expect(sampleNetworkNews[0]?.title).toContain('Compose');
    expect(sampleNetworkNews[0]?.topics).toContain('topic-compose');
  });
});
