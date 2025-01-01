import { PropsWithChildren } from 'react';
import { ThemeProvider } from '../themes/theme.provider';

export function AppProvider(props: PropsWithChildren) {
  const { children } = props;

  return <ThemeProvider>{children}</ThemeProvider>;
}
