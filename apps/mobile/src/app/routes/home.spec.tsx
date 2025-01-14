import { render, screen } from '@testing-library/react-native';

import { ThemeProvider } from '@/themes';

import { DashboardScreen } from './home';

test('renders correctly', () => {
  render(<DashboardScreen />, {
    wrapper: ThemeProvider,
  });

  const text = screen.getByText('This is dashboard screen');

  expect(text).toBeOnTheScreen();
});
