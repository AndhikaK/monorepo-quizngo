import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { makeStyles } from '@/themes';

import { Icon } from '../icon';
import { RippleTouchable } from '../ripple-touchable';
import { Typography } from '../typography';
import { View } from '../view';

type AppbarProps = {
  title?: string;
  onBackIconPress?: () => void;
};
export function Appbar(props: AppbarProps) {
  const { title, onBackIconPress } = props;
  const styles = useStyles(props);
  const insets = useSafeAreaInsets();

  return (
    <View
      backgroundColor="bg-primary"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.contentContainer}>
        {!!onBackIconPress && (
          <RippleTouchable onPress={onBackIconPress} style={styles.backContainer}>
            <Icon name="chevron-back-outline" />
          </RippleTouchable>
        )}
        <Typography variant="subheading" fontWeight="semibold">
          {title}
        </Typography>
      </View>
    </View>
  );
}

const useStyles = makeStyles((themes, props: AppbarProps) => {
  const { Spacing } = themes;
  const { onBackIconPress } = props;

  return {
    container: {},
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: onBackIconPress ? 'center' : 'flex-start',
      paddingHorizontal: Spacing.lg,
      padding: Spacing.md,
    },
    backContainer: {
      position: 'absolute',
      left: Spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 99,
      overflow: 'hidden',
    },
  };
});
