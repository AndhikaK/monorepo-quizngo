import { Suspense } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen } from './routes/dashboard';

const Stack = createNativeStackNavigator();

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
