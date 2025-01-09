import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  dashboard: BottomTabParamList;
  'account/preferences/display-settings': undefined;
};

export type BottomTabParamList = {
  'dashboard/home': undefined;
  'dashboard/account': undefined;
};

export type NavigationScreenProps = NativeStackScreenProps<RootStackParamList>;

export type BottomNavigationScreenProps<
  Route extends keyof BottomTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, Route>,
  NativeStackScreenProps<RootStackParamList>
>;
