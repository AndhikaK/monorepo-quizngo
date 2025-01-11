import { makeStyles } from '@/themes';

import { View } from '../view';

export type SwitchProps = {
  checked: boolean;
  disabled?: boolean;
};
export function Switch(props: SwitchProps) {
  const styles = useStyles(props);

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
    </View>
  );
}

const useStyles = makeStyles((themes, props: SwitchProps) => {
  const { checked = false } = props;
  const { Colors } = themes;

  return {
    container: {
      backgroundColor: checked
        ? Colors['text-accent']
        : Colors['fill-secondary'],
      width: 46,
      borderRadius: 99,
      padding: 4,
      flexDirection: 'row',
      justifyContent: checked ? 'flex-end' : 'flex-start',
    },
    circle: {
      height: 18,
      width: 18,
      borderRadius: 99,
      backgroundColor: Colors['bg-primary'],
    },
  };
});
