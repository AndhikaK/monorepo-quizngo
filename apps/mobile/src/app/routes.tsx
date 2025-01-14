import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountScreen } from '@/app/routes/account';
import { DisplaySettingsScreen } from '@/app/routes/account/preferences/display-settings';
import { DashboardScreen } from '@/app/routes/home';
import { BottomTabItem, Header, Icon, Typography } from '@/components/ui';
import { useTheme } from '@/themes';

import { LanguageSettingScreen } from './routes/account/preferences/language';
import { BottomTabParamList, RootStackParamList } from './routes.type';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabRouter = () => {
  const { t } = useTranslation(['account']);
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
            <Icon
              name="home-outline"
              color={focused ? 'text-accent' : 'text-disabled'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="dashboard/account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerTitle: t('account:index.screen_header'),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person-outline"
              color={focused ? 'text-accent' : 'text-disabled'}
            />
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
              name="account/preferences/language"
              component={LanguageSettingScreen}
            />
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
