import type {Observable} from '@core/domain';

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
