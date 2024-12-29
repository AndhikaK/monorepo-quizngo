import { Suspense } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { DashboardScreen } from './routes/dashboard';

const Stack = createStackNavigator();

export function AppRouter() {
  return (
    <Stack.Navigator
      screenLayout={({ children }) => (
        <Suspense fallback={<Text>Loading...</Text>}>{children}</Suspense>
      )}
    >
      <Stack.Screen name="Home" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
