import type {NetworkChangeListDto} from '../models/network';
import type {ChangeListVersions, Synchronizer} from '@core/domain';

export interface ChangeListSyncParams {
  readonly versionReader: (versions: ChangeListVersions) => number;
  readonly changeListFetcher: (
    currentVersion: number,
  ) => Promise<readonly NetworkChangeListDto[]>;
  readonly versionUpdater: (
    versions: ChangeListVersions,
    latestVersion: number,
  ) => ChangeListVersions;
  readonly modelDeleter: (ids: readonly string[]) => Promise<void>;
  readonly modelUpdater: (ids: readonly string[]) => Promise<void>;
}

export async function changeListSync(
  synchronizer: Synchronizer,
  params: ChangeListSyncParams,
): Promise<boolean> {
  try {
    const versions = await synchronizer.getChangeListVersions();
    const currentVersion = params.versionReader(versions);
    const changeList = await params.changeListFetcher(currentVersion);
    if (changeList.length === 0) {
      return true;
    }

    const deleted = changeList.filter(entry => entry.isDelete);
    const updated = changeList.filter(entry => !entry.isDelete);

    await params.modelDeleter(deleted.map(entry => entry.id));
    await params.modelUpdater(updated.map(entry => entry.id));

    const latestVersion = changeList[changeList.length - 1]?.changeListVersion;
    if (latestVersion !== undefined) {
      await synchronizer.updateChangeListVersions(current =>
        params.versionUpdater(current, latestVersion),
      );
    }

    return true;
  } catch {
    return false;
  }
}
