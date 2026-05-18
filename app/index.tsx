import {useRootNavigationState, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {niaLog} from '@core/ui/diagnostics/logger';

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    }
    niaLog.info('Index route: replacing with /foryou');
    router.replace('/foryou');
  }, [navigationState?.key, router]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFBFE',
      }}
      testID="nia:index-loading">
      <ActivityIndicator size="large" color="#6750A4" />
    </View>
  );
}
