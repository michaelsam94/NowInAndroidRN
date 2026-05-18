import {createAnalyticsHelper} from '../createAnalyticsHelper';
import {NoOpAnalyticsHelper} from '../NoOpAnalyticsHelper';
import {StubAnalyticsHelper} from '../StubAnalyticsHelper';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {extra: {flavor: 'demo'}},
  },
}));

describe('createAnalyticsHelper', () => {
  it('returns NoOp for demo flavor', () => {
    expect(createAnalyticsHelper()).toBeInstanceOf(NoOpAnalyticsHelper);
  });

  it('returns Stub for prod flavor', () => {
    const constants = jest.requireMock('expo-constants').default;
    constants.expoConfig.extra.flavor = 'prod';
    expect(createAnalyticsHelper()).toBeInstanceOf(StubAnalyticsHelper);
    constants.expoConfig.extra.flavor = 'demo';
  });
});
