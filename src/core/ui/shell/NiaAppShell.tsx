import React from 'react';
import {View} from 'react-native';

import {OfflineSnackbar} from '../components/OfflineSnackbar';
import {useAppStore} from '@store/index';

interface NiaAppShellProps {
  readonly children: React.ReactNode;
  readonly showOfflineSnackbar?: boolean;
}

export function NiaAppShell({
  children,
  showOfflineSnackbar = false,
}: NiaAppShellProps) {
  const isSyncing = useAppStore(state => state.isSyncing);

  return (
    <View className="flex-1">
      {children}
      <OfflineSnackbar visible={showOfflineSnackbar || isSyncing} />
    </View>
  );
}
