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
import { AccountScreen } from '@/app/routes/account';
import { DisplaySettingsScreen } from '@/app/routes/preferences/display-settings';
import { BottomTabItem, Header, Typography } from '@/components/ui';
import { useTheme } from '@/themes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName="dashboard/home"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        header: (props) => <Header {...props} />,
      }}
      tabBar={(props) => <BottomTabItem {...props} />}
    >
      <Tab.Screen
        name="dashboard/home"
        component={DashboardScreen}
        options={{
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
        name="dashboard/profile"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerTitle: 'Account & Settings',
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
        initialRouteName="dashboard"
        screenLayout={({ children }) => (
          <Suspense fallback={<Typography>Loading...</Typography>}>
            {children}
          </Suspense>
        )}
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          headerShadowVisible: false,
          statusBarBackgroundColor: 'transparent',
          statusBarTranslucent: true,
          statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark',
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen name="dashboard" component={BottomTabRouter} />

        <Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="account/preferences/display-settings"
              component={DisplaySettingsScreen}
            />
          </Stack.Group>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
