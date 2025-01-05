import { Text, TextProps, TextStyle } from 'react-native';

import { ColorTokenKey, makeStyles } from '@/themes';

type TypographyVariant = 'heading' | 'subheading' | 'body1' | 'body2';
export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  fontWeight?: 'normal' | 'semibold' | 'bold';
  color?: Extract<ColorTokenKey, `text-${string}`>;
};

export function Typography(props: TypographyProps) {
  const { variant = 'body2', children, style, ...rest } = props;
  const styles = useStyles(props);

  return (
    <Text style={[styles.base, styles[variant], style]} {...rest}>
      {children}
    </Text>
  );
}

type TypographyStyle = Record<TypographyVariant | 'base', TextStyle>;
const useStyles = makeStyles(
  (themes, props: TypographyProps): TypographyStyle => {
    const { color = 'text-primary', fontWeight = 'normal' } = props;
    const { Colors } = themes;

    return {
      base: {
        color: Colors[color] ?? Colors['text-primary'],
        fontWeight,
      },
      heading: {
        fontSize: 22,
      },
      subheading: {
        fontSize: 20,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
    };
  }
);
