import { useTranslation } from 'react-i18next';

import { NavigationScreenProps } from '@/app/routes.type';
import { useHardwareBackPress } from '@/common/hooks';
import { ActionList, Appbar, Icon, View } from '@/components/ui';
import { makeStyles, useTheme } from '@/themes';

type ScreenProps = NavigationScreenProps;
export function DisplaySettingsScreen(props: ScreenProps) {
  const styles = useStyles();
  const { goBackAction } = useHardwareBackPress();
  const { colorScheme, changeTheme } = useTheme();
  const { t } = useTranslation(['account']);

  const isDark = colorScheme === 'dark';

  const switchTheme = () => {
    changeTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={styles.container}>
      <Appbar
        title={t('account:display_settings.screen_header')}
        onBackIconPress={goBackAction}
      />

      <View style={styles.contentContainer}>
        <ActionList
          title={t('account:display_settings.action_menu.theme_title')}
          actions={[
            {
              leadingIcon: (
                <Icon name={isDark ? 'moon-outline' : 'moon-outline'} />
              ),
              trailingIcon: null,
              title: isDark
                ? t('account:display_settings.action_menu.theme_dark')
                : t('account:display_settings.action_menu.theme_light'),
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
