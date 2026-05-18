/** Network DTOs matching Android core/network models. */
export interface NetworkTopicDto {
  readonly id: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly longDescription: string;
  readonly imageUrl: string;
  readonly url: string;
}

export interface NetworkNewsResourceDto {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly url: string;
  readonly headerImageUrl: string;
  readonly publishDate: string;
  readonly type: string;
  readonly topics: readonly string[];
}

export interface NetworkResponseDto<T> {
  readonly data: T;
}

export interface NetworkChangeListDto {
  readonly id: string;
  readonly changeListVersion: number;
  readonly isDelete: boolean;
}
