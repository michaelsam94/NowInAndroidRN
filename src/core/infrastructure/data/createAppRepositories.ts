import {MMKV} from 'react-native-mmkv';

import {
  CompositeUserNewsResourceRepository,
  DemoAssetDataSource,
  InMemoryLocalDataSource,
  MmkvSynchronizer,
  OfflineFirstNewsRepository,
  OfflineFirstTopicsRepository,
  OfflineFirstUserDataRepository,
  UserPreferencesDataSource,
  seedDatabaseIfEmpty,
  type KeyValueStorage,
} from '@core/data';

const appMmkv = new MMKV({id: 'nia-app-data'});

const keyValueStorage: KeyValueStorage = {
  getString: (key: string) => appMmkv.getString(key),
  set: (key: string, value: string) => {
    appMmkv.set(key, value);
  },
};

const localDataSource = new InMemoryLocalDataSource();
const networkDataSource = new DemoAssetDataSource();
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
};
