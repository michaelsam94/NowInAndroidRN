import type {AnalyticsHelper} from './AnalyticsHelper';
import type {AnalyticsEvent} from './AnalyticsEvent';

export class NoOpAnalyticsHelper implements AnalyticsHelper {
  logEvent(_event: AnalyticsEvent): void {
    // Demo / tests: analytics disabled.
  }
}
