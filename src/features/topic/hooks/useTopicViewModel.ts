import {useCallback, useMemo} from 'react';

import {
  emptyUserData,
  type FollowableTopic,
  type UserNewsResource,
} from '@core/domain';
import {useObservable} from '@core/ui/hooks/useObservable';

import type {TopicUiState, TopicViewModel, TopicViewModelDeps} from '../types';

export function useTopicViewModel(
  deps: TopicViewModelDeps,
  topicId: string,
): TopicViewModel {
  useObservable(deps.userDataRepository.userData, emptyUserData);

  const followableTopics = useObservable(
    useMemo(() => deps.getFollowableTopics.invoke(), [deps.getFollowableTopics]),
    [],
  );

  const followableTopic: FollowableTopic | null = useMemo(
    () => followableTopics.find(item => item.topic.id === topicId) ?? null,
    [followableTopics, topicId],
  );

  const news = useObservable(
    useMemo(
      () =>
        deps.getUserNewsResources.invoke({
          filterTopicIds: new Set([topicId]),
          filterNewsIds: null,
        }),
      [deps.getUserNewsResources, topicId],
    ),
    [] as readonly UserNewsResource[],
  );

  const uiState: TopicUiState = useMemo(
    () => ({
      topic: followableTopic,
      news,
      isLoading: followableTopic === null,
    }),
    [followableTopic, news],
  );

  const onFollowClick = useCallback(
    (isFollowed: boolean) => {
      void deps.userDataRepository.setTopicIdFollowed(topicId, isFollowed);
    },
    [deps.userDataRepository, topicId],
  );

  const onNewsResourceViewed = useCallback(
    (newsResourceId: string) => {
      void deps.userDataRepository.setNewsResourceViewed(newsResourceId, true);
    },
    [deps.userDataRepository],
  );

  return {
    uiState,
    onFollowClick,
    onNewsResourceViewed,
  };
}
