import { View } from 'react-native';

import { RippleTouchable, Typography } from '@/components/ui';
import { makeStyles, useTheme } from '@/themes';

export function ProfileScreen() {
  const { changeTheme, colorScheme } = useTheme();

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <RippleTouchable
        onPress={() => changeTheme(colorScheme === 'light' ? 'dark' : 'light')}
      >
        <Typography>Change Theme</Typography>
      </RippleTouchable>
      <Typography>This is ProfileScreen {colorScheme}</Typography>
    </View>
  );
}

const useStyles = makeStyles(() => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
