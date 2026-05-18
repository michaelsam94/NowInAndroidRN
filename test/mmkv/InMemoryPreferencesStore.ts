/**
 * MMKV stand-in for Jest (Phase 5 will use react-native-mmkv in app code).
 */
export class InMemoryPreferencesStore {
  private readonly storage = new Map<string, string | number | boolean>();

  getString(key: string): string | undefined {
    const value = this.storage.get(key);
    return typeof value === 'string' ? value : undefined;
  }

  set(key: string, value: string | number | boolean): void {
    this.storage.set(key, value);
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  clearAll(): void {
    this.storage.clear();
  }

  contains(key: string): boolean {
    return this.storage.has(key);
  }
}
