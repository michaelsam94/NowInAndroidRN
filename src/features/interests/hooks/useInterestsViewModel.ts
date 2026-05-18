import {useCallback, useMemo, useState} from 'react';

import {TopicSortField, type Topic} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';

import type {InterestsUiState, InterestsViewModel, InterestsViewModelDeps} from '../types';

export function useInterestsViewModel(
  deps: InterestsViewModelDeps,
  initialTopicId: string | null = null,
): InterestsViewModel {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    initialTopicId,
  );

  const topicsObservable = useMemo(
    () => deps.getFollowableTopics.invoke(TopicSortField.Name),
    [deps.getFollowableTopics],
  );
  const topics = useObservable(topicsObservable, []);

  const selectedTopic: Topic | null = useMemo(() => {
    if (selectedTopicId === null) {
      return null;
    }
    return topics.find(item => item.topic.id === selectedTopicId)?.topic ?? null;
  }, [selectedTopicId, topics]);

  const uiState: InterestsUiState = useMemo(
    () => ({
      topics,
      selectedTopicId,
      selectedTopic,
    }),
    [selectedTopic, selectedTopicId, topics],
  );

  const onTopicClick = useCallback((topicId: string) => {
    setSelectedTopicId(current => (current === topicId ? null : topicId));
  }, []);

  const onFollowClick = useCallback(
    (topicId: string, isFollowed: boolean) => {
      void deps.userDataRepository.setTopicIdFollowed(topicId, isFollowed);
    },
    [deps.userDataRepository],
  );

  return {
    uiState,
    onTopicClick,
    onFollowClick,
  };
}
