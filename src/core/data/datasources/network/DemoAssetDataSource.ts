import type {NetworkNewsResourceDto, NetworkTopicDto} from '../../models/network';
import {filterChangeListAfter, mapToChangeList, matchIds} from './changeList';
import type {NiaNetworkDataSource} from './NiaNetworkDataSource';

export interface DemoAssetLoader {
  loadTopics(): Promise<readonly NetworkTopicDto[]>;
  loadNewsResources(): Promise<readonly NetworkNewsResourceDto[]>;
}

const defaultLoader: DemoAssetLoader = {
  loadTopics: async () =>
    require('../../../../../assets/demo/topics.json') as NetworkTopicDto[],
  loadNewsResources: async () =>
    require('../../../../../assets/demo/news.json') as NetworkNewsResourceDto[],
};

export class DemoAssetDataSource implements NiaNetworkDataSource {
  private topicsPromise: Promise<readonly NetworkTopicDto[]> | null = null;
  private newsPromise: Promise<readonly NetworkNewsResourceDto[]> | null = null;

  constructor(private readonly loader: DemoAssetLoader = defaultLoader) {}

  private async allTopics(): Promise<readonly NetworkTopicDto[]> {
    if (this.topicsPromise === null) {
      this.topicsPromise = this.loader.loadTopics();
    }
    return this.topicsPromise;
  }

  private async allNews(): Promise<readonly NetworkNewsResourceDto[]> {
    if (this.newsPromise === null) {
      this.newsPromise = this.loader.loadNewsResources();
    }
    return this.newsPromise;
  }

  async getTopics(ids?: readonly string[] | null): Promise<readonly NetworkTopicDto[]> {
    const topics = await this.allTopics();
    return matchIds(topics, ids, topic => topic.id);
  }

  async getNewsResources(
    ids?: readonly string[] | null,
  ): Promise<readonly NetworkNewsResourceDto[]> {
    const news = await this.allNews();
    return matchIds(news, ids, item => item.id);
  }

  async getTopicChangeList(after?: number | null) {
    const topics = await this.allTopics();
    return filterChangeListAfter(
      mapToChangeList(topics, topic => topic.id),
      after,
    );
  }

  async getNewsResourceChangeList(after?: number | null) {
    const news = await this.allNews();
    return filterChangeListAfter(
      mapToChangeList(news, item => item.id),
      after,
    );
  }
}
