import type {Observable, Unsubscribe} from '../types/Observable';

export function collectObservable<T>(
  observable: Observable<T>,
  onValue: (value: T) => void,
): Unsubscribe {
  return observable(onValue) ?? (() => {});
}
