import {InMemoryPreferencesStore} from '../InMemoryPreferencesStore';

describe('InMemoryPreferencesStore', () => {
  it('stores and retrieves string values', () => {
    const store = new InMemoryPreferencesStore();
    store.set('theme_brand', 'ANDROID');
    expect(store.getString('theme_brand')).toBe('ANDROID');
  });

  it('clears all keys', () => {
    const store = new InMemoryPreferencesStore();
    store.set('onboarding_done', true);
    store.clearAll();
    expect(store.contains('onboarding_done')).toBe(false);
  });
});
