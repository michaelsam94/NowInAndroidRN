import type {AnalyticsHelper} from './AnalyticsHelper';
import type {AnalyticsEvent} from './AnalyticsEvent';

/** Logs events to console (prod flavor without Firebase wiring). */
export class StubAnalyticsHelper implements AnalyticsHelper {
  logEvent(event: AnalyticsEvent): void {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[Analytics]', event.type, event.extras ?? []);
    }
  }
}
