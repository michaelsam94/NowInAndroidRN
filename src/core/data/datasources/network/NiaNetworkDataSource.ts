import type {
  NetworkChangeListDto,
  NetworkNewsResourceDto,
  NetworkTopicDto,
} from '../../models/network';

export interface NiaNetworkDataSource {
  getTopics(ids?: readonly string[] | null): Promise<readonly NetworkTopicDto[]>;

  getNewsResources(
    ids?: readonly string[] | null,
  ): Promise<readonly NetworkNewsResourceDto[]>;

  getTopicChangeList(after?: number | null): Promise<readonly NetworkChangeListDto[]>;

  getNewsResourceChangeList(
    after?: number | null,
  ): Promise<readonly NetworkChangeListDto[]>;
}
