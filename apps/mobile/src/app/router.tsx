import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';

const Stack = createStackNavigator();

export function Router() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={Test} />
    </Stack.Navigator>
  );
}

function Test(){
  return <Text>This is a test</Text>
}