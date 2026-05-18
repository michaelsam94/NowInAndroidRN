import type {Unsubscribe} from '@core/domain';

export interface NetworkMonitor {
  /** Subscribes to connectivity changes. Emits immediately with the current state. */
  subscribe(onOnlineChange: (isOnline: boolean) => void): Unsubscribe;
}
