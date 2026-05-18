export interface ChangeListVersions {
  readonly topicChangeListVersion: number;
  readonly newsResourceChangeListVersion: number;
}

export interface Synchronizer {
  getChangeListVersions(): Promise<ChangeListVersions>;
  updateChangeListVersions(
    update: (current: ChangeListVersions) => ChangeListVersions,
  ): Promise<void>;
}

export interface Syncable {
  syncWith(synchronizer: Synchronizer): Promise<boolean>;
}
