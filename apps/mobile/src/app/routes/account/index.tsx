import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ActionList,
  ActionListProps,
  Button,
  Icon,
  Typography,
  View,
} from '@/components/ui';
import { makeStyles } from '@/themes';

import { BottomNavigationScreenProps } from '../../routes.type';

type ScreenProps = BottomNavigationScreenProps<'dashboard/account'>;
export function AccountScreen({ navigation }: ScreenProps) {
  const styles = useStyles();

  const { t } = useTranslation(['account']);

  const preferencesActionList: ActionListProps['actions'] = [
    {
      title: t('account:index.section_menu.language'),
      leadingIcon: <Icon name="language-outline" />,
      onPress: () =>
        navigation.navigate('account/preferences/display-settings'),
    },
    {
      title: t('account:index.section_menu.display_settings'),
      leadingIcon: <Icon name="moon-outline" />,
      onPress: () =>
        navigation.navigate('account/preferences/display-settings'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.signupWrapper}>
        <View>
          <Typography variant="body1" textAlign="center" fontWeight="semibold">
            {t('account:index.nonlogin_title')}
          </Typography>
          <Typography textAlign="center">
            {t('account:index.nonlogin_subtitle')}
          </Typography>
        </View>
        <Button title={t('account:index.btn_create_account')} />
      </View>

      <ActionList title="Preferences" actions={preferencesActionList} />
    </ScrollView>
  );
}

const useStyles = makeStyles((themes) => {
  const { Spacing } = themes;

  return {
    container: {
      flex: 1,
      padding: Spacing.lg,
      paddingTop: Spacing['2xl'],
      gap: Spacing.xl,
    },
    signupWrapper: {
      gap: Spacing.xl,
    },
  };
});
