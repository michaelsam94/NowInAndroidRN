import type {ChangeListVersions, Synchronizer} from '@core/domain';

const emptyVersions = (): ChangeListVersions => ({
  topicChangeListVersion: -1,
  newsResourceChangeListVersion: -1,
});

/** Forces a full changelist fetch (required when local cache was cleared). */
export async function resetSyncVersions(synchronizer: Synchronizer): Promise<void> {
  await synchronizer.updateChangeListVersions(() => emptyVersions());
}
