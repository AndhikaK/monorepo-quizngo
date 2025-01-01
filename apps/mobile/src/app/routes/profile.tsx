import { Text, View } from 'react-native';

import { RippleTouchable } from '@/components/ui';
import { useTheme } from '@/themes';

export function ProfileScreen() {
  const { changeTheme, colorScheme } = useTheme();
  
  return (
    <View>
      <RippleTouchable
        onPress={() => changeTheme(colorScheme === 'light' ? 'dark' : 'light')}
      >
        <Text>Change Theme</Text>
      </RippleTouchable>
      <Text>This is ProfileScreen {colorScheme}</Text>
    </View>
  );
}
