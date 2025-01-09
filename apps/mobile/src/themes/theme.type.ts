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
  | 'text-inverse'
  | 'text-accent'
  | 'border-primary'
  | 'border-black'
  | 'bg-primary'
  | 'bg-secondary'
  | 'bg-inverse'
  | 'fill-primary';

export type ThemeTokenKey = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ColorToken = Record<ColorTokenKey, string>;

export type SpacingToken = Record<ThemeTokenKey, number>;
