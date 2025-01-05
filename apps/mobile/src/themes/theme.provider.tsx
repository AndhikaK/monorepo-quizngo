import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Colors, Spacing } from './tokens';
import { ColorSchemeName, ThemeProviderType } from './theme.type';

export const ThemeContext = createContext<ThemeProviderType>(
  {} as ThemeProviderType
);

export function ThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  // * States
  const [currenctColorScheme, setCurrentColorScheme] =
    useState<ColorSchemeName>('light');

  const changeTheme = (mode: ColorSchemeName) => {
    setCurrentColorScheme(mode);
  };

  const themeContextValue: ThemeProviderType = useMemo(() => {
    return {
      Colors: Colors[currenctColorScheme],
      Spacing,
      colorScheme: currenctColorScheme,

      changeTheme,
    };
  }, [currenctColorScheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
