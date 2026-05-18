import type {Observable} from '@core/domain';

export function snapshotObservable<T>(observable: Observable<T>): Promise<T> {
  return new Promise(resolve => {
    const unsubscribe =
      observable(value => {
        unsubscribe?.();
        resolve(value);
      }) ?? (() => undefined);
  });
}
