export type ColorSchemeName = 'light' | 'dark';

export type ThemeProviderType = {
  Colors: ColorToken;
  colorScheme: ColorSchemeName;

  changeTheme: (mode: ColorSchemeName) => void;
};

export type ColorTokenKey =
  | 'text-primary'
  | 'text-disabled'
  | 'text-accent'
  | 'border-primary'
  | 'bg-primary'
  | 'bg-secondary';

export type ColorToken = Record<ColorTokenKey, string>;

export type ThemeTokenKey = 'sm' | 'md' | 'lg' | 'xl';
