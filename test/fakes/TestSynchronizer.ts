import type {ChangeListVersions, Synchronizer} from '@core/domain';

export class TestSynchronizer implements Synchronizer {
  private versions: ChangeListVersions = {
    topicChangeListVersion: -1,
    newsResourceChangeListVersion: -1,
  };

  async getChangeListVersions(): Promise<ChangeListVersions> {
    return this.versions;
  }

  async updateChangeListVersions(
    update: (current: ChangeListVersions) => ChangeListVersions,
  ): Promise<void> {
    this.versions = update(this.versions);
  }
}
