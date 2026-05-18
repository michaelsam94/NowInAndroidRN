import type {Observable, Unsubscribe} from '../types/Observable';

export function onceObservable<T>(observable: Observable<T>): Promise<T> {
  return new Promise(resolve => {
    let unsubscribe: Unsubscribe = () => {};
    unsubscribe =
      observable(value => {
        setImmediate(() => {
          unsubscribe();
          resolve(value);
        });
      }) ?? (() => {});
  });
}
