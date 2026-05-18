import NetInfo from '@react-native-community/netinfo';

import type {NetworkMonitor} from './NetworkMonitor';

export function createNetInfoNetworkMonitor(): NetworkMonitor {
  return {
    subscribe(onOnlineChange) {
      const apply = (isConnected: boolean | null) => {
        onOnlineChange(isConnected ?? true);
      };

      const unsubscribe = NetInfo.addEventListener(state => {
        apply(state.isConnected);
      });

      void NetInfo.fetch().then(state => {
        apply(state.isConnected);
      });

      return unsubscribe;
    },
  };
}
