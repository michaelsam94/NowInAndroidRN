import React from 'react';
import {View} from 'react-native';

import {OfflineSnackbar} from '../components/OfflineSnackbar';
import {useAppStore} from '@store/index';

interface NiaAppShellProps {
  readonly children: React.ReactNode;
}

export function NiaAppShell({children}: NiaAppShellProps) {
  const isOffline = useAppStore(state => state.isOffline);

  return (
    <View className="flex-1" style={{flex: 1}}>
      {children}
      <OfflineSnackbar visible={isOffline} />
    </View>
  );
}
