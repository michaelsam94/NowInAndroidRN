import {useLocalSearchParams} from 'expo-router';

import {PlaceholderScreen} from '@core/ui/components/PlaceholderScreen';

export default function TopicRoute() {
  const {id} = useLocalSearchParams<{id: string}>();

  return (
    <PlaceholderScreen
      title="Topic"
      subtitle={`Topic id: ${id ?? 'unknown'} — Phase 8`}
    />
  );
}
