import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export const useHardwareBackPress = (onBack?: () => void) => {
  const navigation = useNavigation();

  const goBackAction = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Dashboard');
      }
    }
  }, [onBack, navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBackAction();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [goBackAction]);

  return {
    goBackAction,
  };
};
