import { ColorTokenKey } from '@/themes';

export type IconProps = {
  name: IconName;
  size?: number;
  color?: Extract<ColorTokenKey, `text-${string}`>;
};

type IconName =
  | 'person-outline'
  | 'chevron-forward-outline'
  | 'chevron-down-circle'
  | 'chevron-back-outline'
  | 'language-outline'
  | 'moon-outline';