export interface SyncManager {
  /** Runs topics + news changelist sync and search index population. */
  sync(): Promise<void>;
}
