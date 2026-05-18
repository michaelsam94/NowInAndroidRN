import type {Observable, Unsubscribe} from '@core/domain';

/** Emits the latest value to new subscribers (Kotlin StateFlow / replay=1). */
export function createReplayObservable<T>(
  initial: T,
): {
  observable: Observable<T>;
  emit: (value: T) => void;
  getValue: () => T;
} {
  let current = initial;
  const listeners = new Set<(value: T) => void>();

  const observable: Observable<T> = emit => {
    emit(current);
    listeners.add(emit);
    return () => {
      listeners.delete(emit);
    };
  };

  return {
    observable,
    emit: (value: T) => {
      current = value;
      listeners.forEach(listener => {
        listener(value);
      });
    },
    getValue: () => current,
  };
}

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
        queueMicrotask(() => {
          unsubscribe();
          resolve(value);
        });
      }) ?? (() => {});
  });
}
