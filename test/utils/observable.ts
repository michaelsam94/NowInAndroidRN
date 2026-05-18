import type {Unsubscribe} from '@core/domain';
import {createReplayObservable} from '@core/data/util/replayObservable';

export {createReplayObservable};

/** Collects emissions until unsubscribe; returns cleanup. */
export function collectObservable<T>(
  observable: Observable<T>,
  onValue: (value: T) => void,
): Unsubscribe {
  return observable(onValue) ?? (() => {});
}

/** Resolves after the next emission (safe for synchronous replay observables). */
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
