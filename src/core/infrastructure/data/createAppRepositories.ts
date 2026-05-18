import Constants from 'expo-constants';
import {MMKV} from 'react-native-mmkv';

import {
  CompositeUserNewsResourceRepository,
  DefaultRecentSearchRepository,
  DefaultSearchContentsRepository,
  DemoAssetDataSource,
  InMemoryLocalDataSource,
  MmkvSynchronizer,
  NiaApiDataSource,
  OfflineFirstNewsRepository,
  OfflineFirstTopicsRepository,
  OfflineFirstUserDataRepository,
  UserPreferencesDataSource,
  seedDatabaseIfEmpty,
  type KeyValueStorage,
  type NiaNetworkDataSource,
} from '@core/data';

function createNetworkDataSource(): NiaNetworkDataSource {
  const extra = Constants.expoConfig?.extra as
    | {flavor?: string; apiBase?: string}
    | undefined;

  if (
    extra?.flavor === 'prod' &&
    typeof extra.apiBase === 'string' &&
    extra.apiBase.length > 0
  ) {
    return new NiaApiDataSource(extra.apiBase);
  }

  return new DemoAssetDataSource();
}

const appMmkv = new MMKV({id: 'nia-app-data'});

const keyValueStorage: KeyValueStorage = {
  getString: (key: string) => appMmkv.getString(key),
  set: (key: string, value: string) => {
    appMmkv.set(key, value);
  },
};

const localDataSource = new InMemoryLocalDataSource();
const networkDataSource = createNetworkDataSource();
const userPreferences = new UserPreferencesDataSource(keyValueStorage);
const synchronizer = new MmkvSynchronizer(keyValueStorage);

const topicsRepository = new OfflineFirstTopicsRepository(
  localDataSource,
  networkDataSource,
);
const newsRepository = new OfflineFirstNewsRepository(
  userPreferences,
  localDataSource,
  networkDataSource,
);
const userDataRepository = new OfflineFirstUserDataRepository(userPreferences);
const userNewsResourceRepository = new CompositeUserNewsResourceRepository(
  newsRepository,
  userDataRepository,
);
const searchContentsRepository = new DefaultSearchContentsRepository(
  localDataSource,
);
const recentSearchRepository = new DefaultRecentSearchRepository(localDataSource);

let bootstrapPromise: Promise<void> | null = null;

export function bootstrapAppData(): Promise<void> {
  if (bootstrapPromise === null) {
    bootstrapPromise = seedDatabaseIfEmpty(
      localDataSource,
      topicsRepository,
      newsRepository,
      synchronizer,
    );
  }
  return bootstrapPromise;
}

export const appRepositories = {
  local: localDataSource,
  network: networkDataSource,
  synchronizer,
  topics: topicsRepository,
  news: newsRepository,
  userData: userDataRepository,
  userNewsResources: userNewsResourceRepository,
  searchContents: searchContentsRepository,
  recentSearch: recentSearchRepository,
};
