import {useLocalSearchParams} from 'expo-router';

import {TopicScreen, useTopicViewModel} from '@features/topic';
import {defaultTopicDeps} from '@core/infrastructure/features/defaultFeatureDeps';

export default function TopicRoute() {
  const {id} = useLocalSearchParams<{id: string}>();
  const topicId = typeof id === 'string' ? id : '';
  const viewModel = useTopicViewModel(defaultTopicDeps(), topicId);

  return <TopicScreen viewModel={viewModel} />;
}
