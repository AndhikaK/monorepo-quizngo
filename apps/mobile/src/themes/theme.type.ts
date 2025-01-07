export type ColorSchemeName = 'light' | 'dark';

export type ThemeProviderType = {
  Colors: ColorToken;
  Spacing: SpacingToken;
  colorScheme: ColorSchemeName;

  changeTheme: (mode: ColorSchemeName) => void;
};

export type ColorTokenKey =
  | 'text-primary'
  | 'text-secondary'
  | 'text-disabled'
  | 'text-accent'
  | 'border-primary'
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-inverse';

export type ThemeTokenKey = 'sm' | 'md' | 'lg' | 'xl';

export type ColorToken = Record<ColorTokenKey, string>;

export type SpacingToken = Record<ThemeTokenKey, number>;
