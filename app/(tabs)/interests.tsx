import {PlaceholderScreen} from '@core/ui/components/PlaceholderScreen';
import {useAdaptiveLayout} from '@core/ui/layout/useAdaptiveLayout';

export default function InterestsRoute() {
  const {showTwoPane} = useAdaptiveLayout();

  return (
    <PlaceholderScreen
      title="Interests"
      subtitle={
        showTwoPane
          ? 'List–detail layout active (≥840dp) — Phase 8'
          : 'Follow topics — Phase 8'
      }
    />
  );
}
