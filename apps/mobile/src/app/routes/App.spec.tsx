import { render, screen } from '@testing-library/react-native';

import { AppProvider } from '../provider';

import { DashboardScreen } from './home';

test('renders correctly', () => {
  render(<DashboardScreen />, {
    wrapper: AppProvider,
  });

  const text = screen.getByText('This is dashboard screen');

  expect(text).toBeOnTheScreen();
});
