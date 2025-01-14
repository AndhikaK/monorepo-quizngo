import { registerRootComponent } from 'expo';

import App from './src/app';

import './src/libs/react-native-gesture-handler/gesture-handler';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
