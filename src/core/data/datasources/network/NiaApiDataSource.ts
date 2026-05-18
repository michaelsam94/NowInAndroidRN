import type {
  NetworkChangeListDto,
  NetworkNewsResourceDto,
  NetworkResponseDto,
  NetworkTopicDto,
} from '../../models/network';
import {filterChangeListAfter, matchIds} from './changeList';
import type {NiaNetworkDataSource} from './NiaNetworkDataSource';

const DEFAULT_API_BASE = 'https://niademo.example.com';

export class NiaApiDataSource implements NiaNetworkDataSource {
  constructor(
    private readonly apiBaseUrl: string = DEFAULT_API_BASE,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async getTopics(ids?: readonly string[] | null): Promise<readonly NetworkTopicDto[]> {
    const topics = await this.fetchCollection<NetworkTopicDto>('/topics');
    return matchIds(topics, ids, topic => topic.id);
  }

  async getNewsResources(
    ids?: readonly string[] | null,
  ): Promise<readonly NetworkNewsResourceDto[]> {
    const news = await this.fetchCollection<NetworkNewsResourceDto>('/newsresources');
    return matchIds(news, ids, item => item.id);
  }

  async getTopicChangeList(after?: number | null): Promise<readonly NetworkChangeListDto[]> {
    const changeList = await this.fetchCollection<NetworkChangeListDto>(
      '/changelists/topics',
    );
    return filterChangeListAfter(changeList, after);
  }

  async getNewsResourceChangeList(
    after?: number | null,
  ): Promise<readonly NetworkChangeListDto[]> {
    const changeList = await this.fetchCollection<NetworkChangeListDto>(
      '/changelists/newsresources',
    );
    return filterChangeListAfter(changeList, after);
  }

  private async fetchCollection<T>(path: string): Promise<readonly T[]> {
    const response = await this.fetchImpl(`${this.apiBaseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`NIA API request failed: ${response.status} ${path}`);
    }
    const body = (await response.json()) as NetworkResponseDto<readonly T[]>;
    return body.data;
  }
}
