import { NavigationContainer } from '@react-navigation/native';

import { AppRouter } from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}
