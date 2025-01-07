import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  dashboard: BottomTabParamList;
  'account/preferences/display-settings': undefined;
};

export type BottomTabParamList = {
  'dashboard/home': undefined;
  'dashboard/account': undefined;
};

export type NavigationScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
