import { NavigationScreenProps } from '@/app/routes.type';
import { useHardwareBackPress } from '@/common/hooks';
import { ActionList, Appbar, Icon, View } from '@/components/ui';
import { makeStyles, useTheme } from '@/themes';

type ScreenProps =
  NavigationScreenProps<'account/preferences/display-settings'>;
export function DisplaySettingsScreen(props: ScreenProps) {
  const styles = useStyles();
  const { goBackAction } = useHardwareBackPress();
  const { colorScheme, changeTheme } = useTheme();

  const isDark = colorScheme === 'dark';

  const switchTheme = () => {
    changeTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Appbar title="Display Settings" onBackIconPress={goBackAction} />

      <View style={styles.contentContainer}>
        <ActionList
          title="Theme"
          actions={[
            {
              leadingIcon: (
                <Icon name={isDark ? 'moon-outline' : 'moon-outline'} />
              ),
              trailingIcon: null,
              title: isDark ? 'Dark mode' : 'Light mode',
              onPress: switchTheme,
            },
          ]}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ Spacing }) => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
}));
