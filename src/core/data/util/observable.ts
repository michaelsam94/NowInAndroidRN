import type {Observable, Unsubscribe} from '@core/domain';

export function combineObservable<A, B, R>(
  observableA: Observable<A>,
  observableB: Observable<B>,
  combiner: (valueA: A, valueB: B) => R,
): Observable<R> {
  return emit => {
    let valueA: A | undefined;
    let valueB: B | undefined;

    const tryEmit = (): void => {
      if (valueA !== undefined && valueB !== undefined) {
        emit(combiner(valueA, valueB));
      }
    };

    const unsubscribeA = observableA(nextA => {
      valueA = nextA;
      tryEmit();
    });
    const unsubscribeB = observableB(nextB => {
      valueB = nextB;
      tryEmit();
    });

    return () => {
      unsubscribeA();
      unsubscribeB();
    };
  };
}

export function mapObservable<A, B>(
  observable: Observable<A>,
  mapper: (value: A) => B,
): Observable<B> {
  return emit => observable(value => emit(mapper(value)));
}

export function distinctObservable<T>(
  observable: Observable<T>,
  equals: (previous: T, next: T) => boolean = (a, b) => a === b,
): Observable<T> {
  return emit => {
    let previous: T | undefined;
    return observable(value => {
      if (previous === undefined || !equals(previous, value)) {
        previous = value;
        emit(value);
      }
    });
  };
}

export function switchObservable<T, R>(
  observable: Observable<T>,
  mapper: (value: T) => Observable<R>,
): Observable<R> {
  return emit => {
    let innerUnsubscribe: Unsubscribe = () => undefined;
    const outerUnsubscribe = observable(value => {
      innerUnsubscribe();
      innerUnsubscribe = mapper(value)(emit);
    });
    return () => {
      innerUnsubscribe();
      outerUnsubscribe();
    };
  };
}
