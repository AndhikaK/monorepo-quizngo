import { Suspense } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen } from '@/app/routes/home';
import { ProfileScreen } from '@/app/routes/profile';
import { BottomTabItem } from '@/components/ui';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
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
              <Text style={{ color: focused ? 'red' : 'black' }}>Home</Text>
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
              <Text style={{ color: focused ? 'red' : 'black' }}>Profil</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashboardScreen"
        screenLayout={({ children }) => (
          <Suspense fallback={<Text>Loading...</Text>}>{children}</Suspense>
        )}
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: 'transparent',
        }}
      >
        <Stack.Screen name="DashboardScreen" component={BottomTabRouter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
