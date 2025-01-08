import { ReactNode } from 'react';

import { makeStyles } from '@/themes';

import { Icon } from '../icon';
import { RippleTouchable, RippleTouchableProps } from '../ripple-touchable';
import { Typography } from '../typography';
import { View } from '../view';

export type ActionListProps = {
  title?: string;
  actions: ActionItemProps[];
};
type ActionItemProps = {
  leadingIcon: ReactNode;
  trailingIcon?: ReactNode;
  title: string;
  onPress: () => void;
  isLastItem?: boolean;
} & RippleTouchableProps;
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
    trailingIcon = <Icon name="chevron-forward-outline" />,
    title,
    isLastItem,
    onPress,
    ...rest
  } = props;
  const styles = useStyles();

  return (
    <RippleTouchable
      onPress={onPress}
      style={[styles.actionItemContainer, !isLastItem && styles.borderBottom]}
      {...rest}
    >
      <View style={styles.actionItemTitleWrapper}>
        {leadingIcon}
        <Typography>{title}</Typography>
      </View>
      {trailingIcon}
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
