import {useEffect, useState} from 'react';

import type {Observable} from '@core/domain';

import {collectObservable} from '@core/domain/util/collectObservable';

/**
 * Subscribes to a domain {@link Observable} and mirrors the latest value in React state.
 */
export function useObservable<T>(observable: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue);

  useEffect(() => collectObservable(observable, setValue), [observable]);

  return value;
}
