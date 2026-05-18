import {Ionicons} from '@expo/vector-icons';
import {Tabs, useRouter} from 'expo-router';
import React from 'react';
import {Pressable, View} from 'react-native';

import {NiaAppShell} from '@core/ui/shell/NiaAppShell';
import {TabUnreadBadge} from '@core/ui/components/TabUnreadBadge';
import {useAdaptiveLayout} from '@core/ui/layout/useAdaptiveLayout';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';
import {niaLog} from '@core/ui/diagnostics/logger';
import {useAppStore} from '@store/index';

export const unstable_settings = {
  initialRouteName: 'foryou',
};

function HeaderIconButton({
  icon,
  label,
  onPress,
}: {
  readonly icon: keyof typeof Ionicons.glyphMap;
  readonly label: string;
  readonly onPress: () => void;
}) {
  const {colors} = useNiaTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={`nav:${label.toLowerCase()}`}
      className="mr-3 p-1">
      <Ionicons name={icon} size={24} color={colors.onSurface} />
    </Pressable>
  );
}

export default function TabLayout() {
  const router = useRouter();
  const {colors} = useNiaTheme();

  React.useEffect(() => {
    niaLog.info('TabLayout mounted');
  }, []);
  const {showNavigationRail} = useAdaptiveLayout();
  const unreadForYou = useAppStore(state => state.unreadForYou);
  const unreadBookmarks = useAppStore(state => state.unreadBookmarks);
  const unreadInterests = useAppStore(state => state.unreadInterests);

  return (
    <NiaAppShell>
    <Tabs
      initialRouteName="foryou"
      screenOptions={{
        headerStyle: {backgroundColor: colors.surface},
        headerTintColor: colors.onSurface,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outline,
          ...(showNavigationRail
            ? {
                width: 80,
                height: '100%',
                borderTopWidth: 0,
                borderRightWidth: 1,
                borderRightColor: colors.outline,
              }
            : {}),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        // Navigation rail layout: tabBarPosition 'left' when width >= 600dp
        ...(showNavigationRail ? {tabBarPosition: 'left' as const} : {}),
      }}>
      <Tabs.Screen
        name="foryou"
        options={{
          title: 'For You',
          tabBarIcon: ({color}) => (
            <View>
              <Ionicons name="calendar-outline" size={24} color={color} />
              <TabUnreadBadge visible={unreadForYou} />
            </View>
          ),
          headerTitle: 'Now in Android',
          headerRight: () => (
            <View className="flex-row items-center">
              <HeaderIconButton
                icon="search-outline"
                label="Search"
                onPress={() => router.push('/search')}
              />
              <HeaderIconButton
                icon="settings-outline"
                label="Settings"
                onPress={() => router.push('/settings')}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Saved',
          tabBarIcon: ({color}) => (
            <View>
              <Ionicons name="bookmark-outline" size={24} color={color} />
              <TabUnreadBadge visible={unreadBookmarks} />
            </View>
          ),
          headerRight: () => (
            <HeaderIconButton
              icon="settings-outline"
              label="Settings"
              onPress={() => router.push('/settings')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="interests"
        options={{
          title: 'Interests',
          tabBarIcon: ({color}) => (
            <View>
              <Ionicons name="grid-outline" size={24} color={color} />
              <TabUnreadBadge visible={unreadInterests} />
            </View>
          ),
          headerRight: () => (
            <HeaderIconButton
              icon="settings-outline"
              label="Settings"
              onPress={() => router.push('/settings')}
            />
          ),
        }}
      />
    </Tabs>
    </NiaAppShell>
  );
}
