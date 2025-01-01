import { ColorValue } from 'react-native';

export type ColorSchemeName = 'light' | 'dark';

export type ThemeProviderType = {
  Colors: ColorToken;

  changeTheme: (mode: ColorSchemeName) => void;
};

export type ColorTokenKey = 'border-primary' | 'bg-primary' | 'bg-secondary';

export type ColorToken = Record<ColorTokenKey, ColorValue>;

export type ThemeTokenKey = 'sm' | 'md' | 'lg' | 'xl';
