import { Suspense } from 'react';
import { View } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen } from '@/app/routes/home';
import { ProfileScreen } from '@/app/routes/profile';
import { BottomTabItem, Typography } from '@/components/ui';
import { useTheme } from '@/themes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
      tabBar={(props) => <BottomTabItem {...props} />}
    >
      <Tab.Screen
        name="HomeScreen"
        component={DashboardScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View>
              <Typography color={focused ? 'text-accent' : 'text-disabled'}>
                Home
              </Typography>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Typography color={focused ? 'text-accent' : 'text-disabled'}>
                Profil
              </Typography>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export function AppRouter() {
  const { colorScheme, Colors } = useTheme();

  const navigationTheme: Theme = {
    ...DefaultTheme,
    dark: colorScheme === 'dark',
    colors: {
      background: Colors['bg-secondary'],
      border: Colors['border-primary'],
      card: Colors['bg-primary'],
      notification: Colors['bg-primary'],
      primary: Colors['bg-primary'],
      text: Colors['text-primary'],
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="DashboardScreen"
        screenLayout={({ children }) => (
          <Suspense fallback={<Typography>Loading...</Typography>}>
            {children}
          </Suspense>
        )}
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          statusBarBackgroundColor: 'transparent',
          statusBarTranslucent: true,
          statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
        }}
      >
        <Stack.Screen name="DashboardScreen" component={BottomTabRouter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
