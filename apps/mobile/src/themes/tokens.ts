import { ColorToken, SpacingToken } from './theme.type';

export const light: ColorToken = {
  'text-primary': '#000000',
  'text-secondary': '#9E9E9E',
  'text-accent': '#55B3FF',
  'text-disabled': '#808080',

  'border-primary': '#ECECEC',

  'bg-primary': '#FFFFFF',
  'bg-secondary': '#EEEEEE',
  'bg-inverse': '#000000',
};

export const dark: ColorToken = {
  'text-primary': '#FFFFFF',
  'text-secondary': '#9E9E9E',
  'text-accent': '#55B3FF',
  'text-disabled': '#808080',

  'border-primary': '#2C2C2C',

  'bg-primary': '#121212',
  'bg-secondary': '#1E1E1E',
  'bg-inverse': '#FFFFFF',
};

export const Colors = {
  light,
  dark,
};

export const Spacing: SpacingToken = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
