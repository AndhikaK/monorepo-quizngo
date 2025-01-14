import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NavigationScreenProps } from '@/app/routes.type';
import { useHardwareBackPress } from '@/common/hooks';
import { ActionList, Appbar, Icon, Switch, View } from '@/components/ui';
import { makeStyles } from '@/themes';

type ScreenProps = NavigationScreenProps;
type SystemLanguage = 'en' | 'id';
export function LanguageSettingScreen(props: ScreenProps) {
  const styles = useStyles();
  const { t } = useTranslation(['account']);
  const { goBackAction } = useHardwareBackPress();

  const [systemLanguage, setSystemLanguage] = useState<SystemLanguage>('en');

  const switchLanguage = (lang: SystemLanguage) => {
    setSystemLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Appbar
        title={t('account:language.screen_header')}
        onBackIconPress={goBackAction}
      />

      <View style={styles.contentContainer}>
        <ActionList
          title={t('account:language.action_menu.select_language')}
          actions={[
            {
              leadingIcon: <Icon name="language-outline" />,
              trailingIcon: <Switch checked={systemLanguage === 'en'} />,
              title: t('account:language.action_menu.english'),
              onPress: () => switchLanguage('en'),
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
