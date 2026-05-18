import React from 'react';
import {Platform, Pressable, ScrollView, Switch, Text, View} from 'react-native';

import {DarkThemeConfig, ThemeBrand} from '@core/domain';
import {useNiaTheme} from '@core/ui/theme/ThemeContext';

import type {SettingsViewModel} from '../types';

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
        style={{color: colors.onSurfaceVariant}}>
        {label}
      </Text>
      {children}
    </View>
  );
}

function ThemeOptionChip({
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

interface SettingsScreenProps {
  readonly viewModel: SettingsViewModel;
}

export function SettingsScreen({viewModel: vm}: SettingsScreenProps) {
  const {colors, isDark} = useNiaTheme();
  const {uiState} = vm;

  return (
    <ScrollView
      className="flex-1 px-4 py-6"
      style={{backgroundColor: colors.surface}}
      contentInsetAdjustmentBehavior="automatic">
      <SettingsRow label="Theme brand">
        <View className="flex-row">
          <ThemeOptionChip
            label="Default"
            selected={uiState.themeBrand === ThemeBrand.Default}
            onPress={() => vm.onThemeBrandChange(ThemeBrand.Default)}
          />
          <ThemeOptionChip
            label="Android"
            selected={uiState.themeBrand === ThemeBrand.Android}
            onPress={() => vm.onThemeBrandChange(ThemeBrand.Android)}
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
            <ThemeOptionChip
              key={config}
              label={label}
              selected={uiState.darkThemeConfig === config}
              onPress={() => vm.onDarkThemeConfigChange(config)}
            />
          ))}
        </View>
      </SettingsRow>
      {uiState.dynamicColorAvailable ? (
        <SettingsRow label="Dynamic color">
          <Switch
            value={uiState.useDynamicColor}
            onValueChange={vm.onDynamicColorChange}
            accessibilityLabel="Use dynamic color"
            accessibilityRole="switch"
          />
        </SettingsRow>
      ) : null}
      <Text className="mt-4 text-sm" style={{color: colors.onSurfaceVariant}}>
        Preview: {isDark ? 'Dark' : 'Light'} · {uiState.themeBrand}
        {Platform.OS === 'ios' ? ' (iOS)' : ''}
      </Text>
    </ScrollView>
  );
}
