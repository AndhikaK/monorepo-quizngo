import { View } from 'react-native';

import { RippleTouchable, Typography } from '@/components/ui';
import { useTheme } from '@/themes';

export function ProfileScreen() {
  const { changeTheme, colorScheme } = useTheme();
  
  return (
    <View>
      <RippleTouchable
        onPress={() => changeTheme(colorScheme === 'light' ? 'dark' : 'light')}
      >
        <Typography>Change Theme</Typography>
      </RippleTouchable>
      <Typography>This is ProfileScreen {colorScheme}</Typography>
    </View>
  );
}
