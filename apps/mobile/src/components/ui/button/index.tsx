import { makeStyles, useTheme } from '@/themes';

import { RippleTouchable, RippleTouchableProps } from '../ripple-touchable';
import { Typography } from '../typography';

type ButtonProps = {
  title: string;
} & RippleTouchableProps;
export function Button(props: ButtonProps) {
  const { title, ...rest } = props;

  const { Colors } = useTheme();
  const styles = useStyles();
  return (
    <RippleTouchable
      rippleColor={Colors['bg-primary']}
      style={styles.container}
      {...rest}
    >
      <Typography color="text-inverse" variant="body1" fontWeight="semibold">
        {title}
      </Typography>
    </RippleTouchable>
  );
}

const useStyles = makeStyles(({ Colors }) => {
  return {
    container: {
      height: 56,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: Colors['fill-primary'],
      borderWidth: 2,
      borderColor: Colors['border-black'],
    },
  };
});
