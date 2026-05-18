export interface OssLicenseEntry {
  readonly name: string;
  readonly license: string;
}

/** Curated OSS list for the Settings licenses screen (Phase 9). */
export const ossLicenses: readonly OssLicenseEntry[] = [
  {name: 'React Native', license: 'MIT'},
  {name: 'Expo', license: 'MIT'},
  {name: 'TanStack Query', license: 'MIT'},
  {name: 'Zustand', license: 'MIT'},
  {name: 'NativeWind', license: 'MIT'},
  {name: 'FlashList', license: 'MIT'},
  {name: 'MMKV', license: 'BSD-3-Clause'},
];
