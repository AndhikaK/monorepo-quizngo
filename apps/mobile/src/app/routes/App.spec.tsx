import * as React from 'react';
import { render } from '@testing-library/react-native';

import { DashboardScreen } from './dashboard';

test('renders correctly', () => {
  const { getByTestId } = render(<DashboardScreen />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
