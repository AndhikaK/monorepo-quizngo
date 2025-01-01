import { ColorValue } from 'react-native';

export type ColorSchemeName = 'light' | 'dark';

export type ThemeProviderType = {
  Colors: ColorToken;
  colorScheme: ColorSchemeName;

  changeTheme: (mode: ColorSchemeName) => void;
};

export type ColorTokenKey =
  | 'text-primary'
  | 'border-primary'
  | 'bg-primary'
  | 'bg-secondary';

export type ColorToken = Record<ColorTokenKey, ColorValue>;

export type ThemeTokenKey = 'sm' | 'md' | 'lg' | 'xl';