/**
 * Framework-agnostic stream type (Kotlin Flow equivalent).
 * Data layer bridges to TanStack Query / Zustand in presentation.
 */
export type Unsubscribe = () => void;

export type Observable<T> = (emit: (value: T) => void) => Unsubscribe;
