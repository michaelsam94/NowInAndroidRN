import type {Topic, TopicsRepository} from '@core/domain';

import {createReplayObservable} from '../utils/observable';

export class TestTopicsRepository implements TopicsRepository {
  private readonly topicsSubject = createReplayObservable<readonly Topic[]>(
    [],
  );

  getTopics() {
    return this.topicsSubject.observable;
  }

  getTopic(id: string) {
    return (emit: (value: Topic) => void) => {
      const unsubscribe = this.topicsSubject.observable(topics => {
        const topic = topics.find(item => item.id === id);
        if (topic !== undefined) {
          emit(topic);
        }
      });
      return unsubscribe;
    };
  }

  setTopics(topics: readonly Topic[]): void {
    this.topicsSubject.emit(topics);
  }

  async syncWith(): Promise<boolean> {
    return true;
  }
}
