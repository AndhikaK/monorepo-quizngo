import { View as RNView, ViewProps as RNViewProps } from 'react-native';

import { ColorTokenKey, makeStyles } from '@/themes';

export type ViewProps = {
  backgroundColor?: Extract<ColorTokenKey, `bg-${string}`>;
} & RNViewProps;

export function View(props: ViewProps) {
  const { backgroundColor, children, style, ...rest } = props;

  const styles = useStyles(props);

  return <RNView style={[styles.base, style]} {...rest}>
    {children}
  </RNView>;
}

const useStyles = makeStyles((themes, props: ViewProps) => {
  const { backgroundColor } = props;
  const { Colors } = themes;

  return {
    base: {
      backgroundColor: (backgroundColor && Colors[backgroundColor]) ?? 'transparent',
    },
  };
});
