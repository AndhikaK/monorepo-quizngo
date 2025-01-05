import { ColorTokenKey, useTheme } from '@/themes';
import Ionicons from '@expo/vector-icons/Ionicons';

export type IconProps = {
  name: 'person-outline' | 'chevron-forward-outline' | 'chevron-down-circle';
  size?: number;
  color?: Extract<ColorTokenKey, `text-${string}`>;
};
export function Icon(props: IconProps) {
  const { name, color = 'text-primary', size = 24 } = props;
  const { Colors } = useTheme();

  if (!name) return null;

  return <Ionicons name={name} size={size} color={Colors[color]} />;
}
