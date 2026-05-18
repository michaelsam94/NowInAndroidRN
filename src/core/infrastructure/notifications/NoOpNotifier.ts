import type {NewsResource} from '@core/domain';

import type {Notifier} from './Notifier';

/** Demo flavor: notifications disabled (mirrors Android `NoOpNotifier`). */
export class NoOpNotifier implements Notifier {
  postNewsNotifications(_newsResources: readonly NewsResource[]): void {
    // No-op
  }
}
