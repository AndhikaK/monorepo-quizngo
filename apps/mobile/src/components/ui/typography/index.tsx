import { Text, TextProps } from 'react-native';

import { ColorTokenKey, makeStyles } from '@/themes';

export type TypographyProps = TextProps & {
  variant?: 'body1';
  color?: Extract<ColorTokenKey, `text-${string}`>;
};

export function Typography(props: TypographyProps) {
  const {  children, style, ...rest } = props;
  const styles = useStyles(props);

  return (
    <Text style={[styles.base, style]} {...rest}>
      {children}
    </Text>
  );
}

const useStyles = makeStyles((themes, props: TypographyProps) => {
  const { color = 'text-primary' } = props;
  const { Colors } = themes;

  return {
    base: {
      fontSize: 14,
      color: Colors[color] ?? Colors['text-primary'],
    },
  };
});
