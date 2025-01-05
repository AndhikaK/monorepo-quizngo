import { ReactNode } from 'react';

import { makeStyles } from '@/themes';

import { Icon } from '../icon';
import { RippleTouchable } from '../ripple-touchable';
import { Typography } from '../typography';
import { View } from '../view';

export type ActionListProps = {
  title?: string;
  actions: ActionItemProps[];
};
type ActionItemProps = {
  leadingIcon: ReactNode;
  title: string;
  onPress: () => void;
  isLastItem?: boolean;
};
export function ActionList(props: ActionListProps) {
  const { title, actions } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {!!title && (
        <Typography variant="body1" fontWeight="semibold">
          {title}
        </Typography>
      )}

      {actions.length > 0 && (
        <View backgroundColor="bg-primary" style={styles.listContainer}>
          {actions.map((item, idx) => (
            <ActionItem
              key={idx}
              {...item}
              isLastItem={actions.length - 1 === idx}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function ActionItem(props: ActionItemProps) {
  const {
    leadingIcon = <Icon name="chevron-down-circle" />,
    title,
    isLastItem,
    onPress
  } = props;
  const styles = useStyles();

  return (
    <RippleTouchable
    onPress={onPress}
      style={[styles.actionItemContainer, !isLastItem && styles.borderBottom]}
    >
      <View style={styles.actionItemTitleWrapper}>
        {leadingIcon}
        <Typography>{title}</Typography>
      </View>
      <Icon name="chevron-forward-outline" />
    </RippleTouchable>
  );
}

const useStyles = makeStyles((themes) => {
  const { Colors, Spacing } = themes;

  return {
    container: {
      gap: Spacing.lg,
    },
    listContainer: {
      borderRadius: 8,
      overflow: 'hidden',
    },
    actionItemContainer: {
      padding: Spacing.lg,
      gap: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionItemTitleWrapper: {
      flex: 1,
      flexDirection: 'row',
      gap: Spacing.md,
      alignItems: 'center',
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderColor: Colors['border-primary'],
    },
  };
});
