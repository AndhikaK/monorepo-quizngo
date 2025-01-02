import { render, screen } from '@testing-library/react-native';

import { DashboardScreen } from './home';
import { AppProvider } from '../provider';

test('renders correctly', () => {
  render(<DashboardScreen />, {
    wrapper: AppProvider,
  });

  const text = screen.getByText('This is dashboard screen');

  expect(text).toBeOnTheScreen();
});
