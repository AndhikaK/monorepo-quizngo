import { ScrollView } from 'react-native';

import { ActionList, ActionListProps, Icon } from '@/components/ui';
import { makeStyles } from '@/themes';

import { NavigationScreenProps } from '../routes.type';

type ScreenProps = NavigationScreenProps<'dashboard'>;
export function AccountScreen({ navigation }: ScreenProps) {
  const styles = useStyles();

  const preferencesActionList: ActionListProps['actions'] = [
    {
      title: 'Language',
      leadingIcon: <Icon name="language-outline" />,
      onPress: () =>
        navigation.navigate('account/preferences/display-settings'),
    },
    {
      title: 'Display settings',
      leadingIcon: <Icon name="moon-outline" />,
      onPress: () =>
        navigation.navigate('account/preferences/display-settings'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    },
  };
});
