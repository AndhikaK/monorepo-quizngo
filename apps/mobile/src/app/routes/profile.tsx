import { ScrollView } from 'react-native';

import { ActionList, ActionListProps } from '@/components/ui';
import { makeStyles } from '@/themes';

export function ProfileScreen() {
  const styles = useStyles();

  const preferencesActionList: ActionListProps['actions'] = [
    {
      title: 'Language',
    },
    {
      title: 'System preference',
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
