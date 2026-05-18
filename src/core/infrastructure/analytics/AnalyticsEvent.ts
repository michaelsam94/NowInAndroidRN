export interface AnalyticsParam {
  readonly key: string;
  readonly value: string;
}

export interface AnalyticsEvent {
  readonly type: string;
  readonly extras?: readonly AnalyticsParam[];
}

export const AnalyticsEventTypes = {
  ScreenView: 'screen_view',
} as const;

export const AnalyticsParamKeys = {
  ScreenName: 'screen_name',
} as const;
