import { render, screen } from '@testing-library/react-native';

import { DashboardScreen } from './home';
import { ThemeProvider } from '@/themes';

test('renders correctly', () => {
  render(<DashboardScreen />, {
    wrapper: ThemeProvider,
  });

  const text = screen.getByText('This is dashboard screen');

  expect(text).toBeOnTheScreen();
});
