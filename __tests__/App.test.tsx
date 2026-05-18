import {resolveThemeColors} from '../src/core/ui/theme/tokens';
import {DarkThemeConfig, ThemeBrand} from '@core/domain';

describe('NIA theme tokens', () => {
  it('resolves light default brand colors', () => {
    const colors = resolveThemeColors(
      ThemeBrand.Default,
      DarkThemeConfig.Light,
      'light',
    );
    expect(colors.primary).toBe('#6750A4');
    expect(colors.surface).toBe('#FFFBFE');
  });

  it('resolves Android brand green in light mode', () => {
    const colors = resolveThemeColors(
      ThemeBrand.Android,
      DarkThemeConfig.Light,
      'light',
    );
    expect(colors.primary).toBe('#3DDC84');
  });
});
