import type {AnalyticsEvent} from './AnalyticsEvent';

export interface AnalyticsHelper {
  logEvent(event: AnalyticsEvent): void;
}
