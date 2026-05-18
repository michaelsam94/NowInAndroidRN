import React from 'react';
import {Platform, Pressable, ScrollView, Switch, Text, View} from 'react-native';

import {DarkThemeConfig, ThemeBrand} from '@core/domain';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';
import {useThemeStore} from '@store/index';

function SettingsRow({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  const {colors} = useNiaTheme();

  return (
    <View className="mb-4">
      <Text
        className="mb-2 text-sm font-medium"
        style={{color: colors.onSurfaceVariant}}
        accessibilityRole="text">
        {label}
      </Text>
      {children}
    </View>
  );
}

function ThemeChip({
  label,
  selected,
  onPress,
}: {
  readonly label: string;
  readonly selected: boolean;
  readonly onPress: () => void;
}) {
  const {colors} = useNiaTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{selected}}
      className="mr-2 rounded-full border px-4 py-2"
      style={{
        borderColor: selected ? colors.primary : colors.outline,
        backgroundColor: selected ? colors.primaryContainer : colors.surface,
      }}>
      <Text style={{color: colors.onSurface}}>{label}</Text>
    </Pressable>
  );
}

export default function SettingsRoute() {
  const {colors, isDark} = useNiaTheme();
  const {
    themeBrand,
    darkThemeConfig,
    useDynamicColor,
    setThemeBrand,
    setDarkThemeConfig,
    setUseDynamicColor,
  } = useThemeStore();

  const dynamicColorAvailable = Platform.OS === 'android';

  return (
    <ScrollView
      className="flex-1 px-4 py-6"
      style={{backgroundColor: colors.surface}}
      contentInsetAdjustmentBehavior="automatic">
      <Text
        className="mb-6 text-xl font-semibold"
        style={{color: colors.onSurface}}
        accessibilityRole="header">
        Settings
      </Text>

      <SettingsRow label="Theme brand">
        <View className="flex-row">
          <ThemeChip
            label="Default"
            selected={themeBrand === ThemeBrand.Default}
            onPress={() => setThemeBrand(ThemeBrand.Default)}
          />
          <ThemeChip
            label="Android"
            selected={themeBrand === ThemeBrand.Android}
            onPress={() => setThemeBrand(ThemeBrand.Android)}
          />
        </View>
      </SettingsRow>

      <SettingsRow label="Dark mode">
        <View className="flex-row flex-wrap">
          {(
            [
              [DarkThemeConfig.FollowSystem, 'System'],
              [DarkThemeConfig.Light, 'Light'],
              [DarkThemeConfig.Dark, 'Dark'],
            ] as const
          ).map(([config, label]) => (
            <ThemeChip
              key={config}
              label={label}
              selected={darkThemeConfig === config}
              onPress={() => setDarkThemeConfig(config)}
            />
          ))}
        </View>
      </SettingsRow>

      {dynamicColorAvailable ? (
        <SettingsRow label="Dynamic color (Material You)">
          <Switch
            value={useDynamicColor}
            onValueChange={setUseDynamicColor}
            accessibilityLabel="Use dynamic color"
            accessibilityRole="switch"
            accessibilityState={{checked: useDynamicColor}}
          />
        </SettingsRow>
      ) : null}

      <Text
        className="mt-4 text-sm"
        style={{color: colors.onSurfaceVariant}}
        accessibilityRole="text">
        Preview: {isDark ? 'Dark' : 'Light'} · {themeBrand}
      </Text>
    </ScrollView>
  );
}
