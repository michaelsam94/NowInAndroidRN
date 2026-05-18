import type {NetworkChangeListDto} from '../../models/network';

export function mapToChangeList<T>(
  items: readonly T[],
  idGetter: (item: T) => string,
): NetworkChangeListDto[] {
  return items.map((item, index) => ({
    id: idGetter(item),
    changeListVersion: index,
    isDelete: false,
  }));
}

export function filterChangeListAfter(
  changeList: readonly NetworkChangeListDto[],
  after: number | null | undefined,
): NetworkChangeListDto[] {
  if (after === null || after === undefined) {
    return [...changeList];
  }
  return changeList.filter(entry => entry.changeListVersion > after);
}

export function matchIds<T>(
  items: readonly T[],
  ids: readonly string[] | null | undefined,
  idGetter: (item: T) => string,
): T[] {
  if (ids === null || ids === undefined) {
    return [...items];
  }
  const idSet = new Set(ids);
  return items.filter(item => idSet.has(idGetter(item)));
}
