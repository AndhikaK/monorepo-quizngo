import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { makeStyles } from '@/themes';

import { Typography } from '../typography';
import { View } from '../view';

export function Header(props: BottomTabHeaderProps | NativeStackHeaderProps) {
  const { options, route } = props;

  const insets = useSafeAreaInsets();
  const styles = useStyles();

  const title = getHeaderTitle(options, route.name);

  return (
    <View backgroundColor="bg-primary" style={{ paddingTop: insets.top }}>
      <View style={styles.container}>
        <Typography variant="subheading" fontWeight="semibold">
          {title}
        </Typography>
      </View>
    </View>
  );
}

const useStyles = makeStyles((themes) => {
  const { Colors, Spacing } = themes;

  return {
    container: {
      padding: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderBottomWidth: 1,
      borderColor: Colors['border-primary'],
    },
  };
});
