import Ionicons from '@expo/vector-icons/Ionicons';

import { useTheme } from '@/themes';

import { IconProps } from './index.type';

export function Icon(props: IconProps) {
  const { name, color = 'text-primary', size = 24 } = props;
  const { Colors } = useTheme();

  if (!name) return null;

  return <Ionicons name={name} size={size} color={Colors[color]} />;
}
