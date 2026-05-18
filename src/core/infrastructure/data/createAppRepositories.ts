import Constants from 'expo-constants';
import {MMKV} from 'react-native-mmkv';

import {
  CompositeUserNewsResourceRepository,
  DefaultRecentSearchRepository,
  DefaultSearchContentsRepository,
  DemoAssetDataSource,
  MmkvCachedLocalDataSource,
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
import {niaLog} from '@core/ui/diagnostics/logger';

function createNetworkDataSource(): NiaNetworkDataSource {
  const extra = Constants.expoConfig?.extra as
    | {flavor?: string; apiBase?: string}
    | undefined;

  const apiBase =
    (typeof extra?.apiBase === 'string' ? extra.apiBase : '') ||
    (typeof process.env.EXPO_PUBLIC_API_BASE === 'string'
      ? process.env.EXPO_PUBLIC_API_BASE
      : '');

  if (apiBase.length > 0) {
    niaLog.info('Using NIA API', {apiBase});
    return new NiaApiDataSource(apiBase);
  }

  niaLog.info('Using demo bundled JSON data source');
  return new DemoAssetDataSource();
}

const appMmkv = new MMKV({id: 'nia-app-data'});

const keyValueStorage: KeyValueStorage = {
  getString: (key: string) => appMmkv.getString(key),
  set: (key: string, value: string) => {
    appMmkv.set(key, value);
  },
};

const localDataSource = new MmkvCachedLocalDataSource(keyValueStorage);
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
    bootstrapPromise = (async () => {
      await seedDatabaseIfEmpty(
        localDataSource,
        topicsRepository,
        newsRepository,
        synchronizer,
        userDataRepository,
      );
      const isEmpty = await localDataSource.isEmpty();
      niaLog.info('Bootstrap data state', {isEmpty});
    })();
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
