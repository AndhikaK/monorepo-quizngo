import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { makeStyles } from '@/themes';
import { RippleTouchable, View } from '@/components/ui';

export function BottomTabItem({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const style = useStyles();

  return (
    <View
      backgroundColor="bg-primary"
      style={[style.container, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <RippleTouchable
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.tabItemContainer}
          >
            {options &&
              options?.tabBarIcon?.({
                focused: isFocused,
                color: 'red',
                size: 20,
              })}
          </RippleTouchable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((themes) => {
  const { Colors } = themes;

  return {
    container: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: Colors['border-primary'],
    },
    tabItemContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 70,
    },
  };
});
