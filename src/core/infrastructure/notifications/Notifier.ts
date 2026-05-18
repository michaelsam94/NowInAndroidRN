import type {NewsResource} from '@core/domain';

export interface Notifier {
  postNewsNotifications(newsResources: readonly NewsResource[]): void;
}
