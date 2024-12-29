import { render, screen } from '@testing-library/react-native';

import { DashboardScreen } from './dashboard';

test('renders correctly', () => {
  render(<DashboardScreen />);

  const text = screen.getByText('This is dashboard screen');

  expect(text).toBeOnTheScreen();
});
