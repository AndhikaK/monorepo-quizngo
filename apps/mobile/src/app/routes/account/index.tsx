import { ScrollView } from 'react-native';

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
      <View style={styles.signupWrapper}>
        <View>
          <Typography variant="body1" textAlign="center" fontWeight="semibold">
            Get access to Proficiency Test
          </Typography>
          <Typography textAlign="center">
            Create an account to access feature
          </Typography>
        </View>
        <Button title="CREATE AN ACCOUNT" />
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
