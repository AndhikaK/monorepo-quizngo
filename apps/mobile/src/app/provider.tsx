import { PropsWithChildren } from 'react';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { ThemeProvider } from '@/themes/theme.provider';

export function AppProvider(props: PropsWithChildren) {
  const { children } = props;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return <ThemeProvider>{children}</ThemeProvider>;
}
