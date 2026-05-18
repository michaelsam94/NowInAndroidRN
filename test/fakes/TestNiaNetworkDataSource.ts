import {DemoAssetDataSource} from '@core/data/datasources/network/DemoAssetDataSource';
import type {NiaNetworkDataSource} from '@core/data/datasources/network/NiaNetworkDataSource';
import type {
  NetworkChangeListDto,
  NetworkNewsResourceDto,
  NetworkTopicDto,
} from '@core/data/models/network';
import {
  filterChangeListAfter,
  mapToChangeList,
  matchIds,
} from '@core/data/datasources/network/changeList';

export enum CollectionType {
  Topics = 'topics',
  NewsResources = 'news_resources',
}

export class TestNiaNetworkDataSource implements NiaNetworkDataSource {
  private readonly source = new DemoAssetDataSource();
  private allTopics: readonly NetworkTopicDto[] = [];
  private allNews: readonly NetworkNewsResourceDto[] = [];
  private changeLists: Record<CollectionType, NetworkChangeListDto[]> = {
    [CollectionType.Topics]: [],
    [CollectionType.NewsResources]: [],
  };
  private initialized = false;

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.allTopics = await this.source.getTopics();
    this.allNews = await this.source.getNewsResources();
    this.changeLists = {
      [CollectionType.Topics]: mapToChangeList(this.allTopics, topic => topic.id),
      [CollectionType.NewsResources]: mapToChangeList(
        this.allNews,
        item => item.id,
      ),
    };
    this.initialized = true;
  }

  async getTopics(ids?: readonly string[] | null): Promise<readonly NetworkTopicDto[]> {
    await this.ensureInitialized();
    return matchIds(this.allTopics, ids, topic => topic.id);
  }

  async getNewsResources(
    ids?: readonly string[] | null,
  ): Promise<readonly NetworkNewsResourceDto[]> {
    await this.ensureInitialized();
    return matchIds(this.allNews, ids, item => item.id);
  }

  async getTopicChangeList(after?: number | null): Promise<readonly NetworkChangeListDto[]> {
    await this.ensureInitialized();
    return filterChangeListAfter(this.changeLists[CollectionType.Topics], after);
  }

  async getNewsResourceChangeList(
    after?: number | null,
  ): Promise<readonly NetworkChangeListDto[]> {
    await this.ensureInitialized();
    return filterChangeListAfter(
      this.changeLists[CollectionType.NewsResources],
      after,
    );
  }

  latestChangeListVersion(collectionType: CollectionType): number {
    const list = this.changeLists[collectionType];
    return list[list.length - 1]?.changeListVersion ?? 0;
  }

  editCollection(
    collectionType: CollectionType,
    id: string,
    isDelete: boolean,
  ): void {
    const list = this.changeLists[collectionType];
    const latestVersion = this.latestChangeListVersion(collectionType) + 1;
    this.changeLists[collectionType] = [
      ...list,
      {id, changeListVersion: latestVersion, isDelete},
    ];
  }
}
