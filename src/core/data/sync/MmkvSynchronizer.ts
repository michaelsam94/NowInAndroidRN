import type {ChangeListVersions, Synchronizer} from '@core/domain';

import type {KeyValueStorage} from '../datasources/mmkv/UserPreferencesDataSource';

const STORAGE_KEY = 'nia.change_list_versions.v1';

const defaultVersions = (): ChangeListVersions => ({
  topicChangeListVersion: -1,
  newsResourceChangeListVersion: -1,
});

export class MmkvSynchronizer implements Synchronizer {
  constructor(private readonly storage: KeyValueStorage) {}

  async getChangeListVersions(): Promise<ChangeListVersions> {
    const raw = this.storage.getString(STORAGE_KEY);
    if (raw === undefined) {
      return defaultVersions();
    }
    try {
      return JSON.parse(raw) as ChangeListVersions;
    } catch {
      return defaultVersions();
    }
  }

  async updateChangeListVersions(
    update: (current: ChangeListVersions) => ChangeListVersions,
  ): Promise<void> {
    const current = await this.getChangeListVersions();
    const next = update(current);
    this.storage.set(STORAGE_KEY, JSON.stringify(next));
  }
}
