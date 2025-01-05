import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from './theme.provider';
import { ColorToken, SpacingToken } from './theme.type';

export const makeStyles =
  <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, V>(
    styles:
      | T
      | ((
          theme: {
            Colors: ColorToken;
            Spacing: SpacingToken;
          },
          props: V
        ) => T)
  ) =>
  (props?: V): T => {
    const { Colors, Spacing } = useTheme();

    return useMemo(() => {
      const theme = {
        Colors,
        Spacing,
      };

      const css =
        typeof styles === 'function'
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            styles(theme, props ?? ({} as any))
          : styles;
      return StyleSheet.create(css);
    }, [Colors, Spacing, props]);
  };
