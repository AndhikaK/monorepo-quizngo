import React, { useCallback, useEffect, useRef,useState } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  I18nManager,
  LayoutChangeEvent,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTheme } from '@/themes';

import { radius,styles } from './styles';

type RippleTouchableProps = {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  rippleFades?: boolean;
  disabled?: boolean;
  onRippleAnimation?: (
    animation: Animated.CompositeAnimation,
    callback: Animated.EndCallback
  ) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof TouchableWithoutFeedback>, 'onLayout'> &
  Omit<React.ComponentProps<typeof Animated.View>, 'onLayout'>;

type RippleState = {
  unique: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  R: number;
};

export const RippleTouchable: React.FC<RippleTouchableProps> = (props) => {
  const {
    rippleOpacity = 0.3,
    rippleDuration = 400,
    rippleSize = 0,
    rippleContainerBorderRadius = 0,
    rippleCentered = false,
    rippleSequential = false,
    rippleFades = true,
    disabled = false,
    onRippleAnimation = (animation, callback) => animation.start(callback),
    onLayout,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    children,
    ...otherProps
  } = props;

  const { Colors } = useTheme();

  const rippleColor = Colors['bg-inverse'];

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const uniqueRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (typeof onLayout === 'function') onLayout(event);
      setDimensions({ width, height });
    },
    [onLayout]
  );

  const startRipple = useCallback(
    (event: GestureResponderEvent) => {
      const { width, height } = dimensions;
      const w2 = 0.5 * width;
      const h2 = 0.5 * height;

      const { locationX, locationY } = rippleCentered
        ? { locationX: w2, locationY: h2 }
        : event.nativeEvent;

      const offsetX = Math.abs(w2 - locationX);
      const offsetY = Math.abs(h2 - locationY);

      const R =
        rippleSize > 0
          ? 0.5 * rippleSize
          : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

      const ripple: RippleState = {
        unique: uniqueRef.current++,
        progress: new Animated.Value(0),
        locationX,
        locationY,
        R,
      };

      const animation = Animated.timing(ripple.progress, {
        toValue: 1,
        easing: Easing.out(Easing.ease),
        duration: rippleDuration,
        useNativeDriver: true,
      });

      onRippleAnimation(animation, () => {
        if (mountedRef.current) {
          setRipples((prevRipples) => prevRipples.slice(1));
        }
      });

      setRipples((prevRipples) => [...prevRipples, ripple]);
    },
    [dimensions, rippleCentered, rippleSize, rippleDuration, onRippleAnimation]
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (!rippleSequential || ripples.length === 0) {
        if (typeof onPress === 'function') {
          requestAnimationFrame(() => onPress(event));
        }
        startRipple(event);
      }
    },
    [onPress, rippleSequential, ripples.length, startRipple]
  );

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      if (typeof onLongPress === 'function') {
        requestAnimationFrame(() => onLongPress(event));
      }
      startRipple(event);
    },
    [onLongPress, startRipple]
  );

  const renderRipple = useCallback(
    ({ unique, progress, locationX, locationY, R }: RippleState) => {
      const rippleStyle = {
        top: locationY - radius,
        [I18nManager.isRTL ? 'right' : 'left']: locationX - radius,
        backgroundColor: rippleColor,
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5 / radius, R / radius],
            }),
          },
        ],
        opacity: rippleFades
          ? progress.interpolate({
              inputRange: [0, 1],
              outputRange: [rippleOpacity, 0],
            })
          : rippleOpacity,
      };

      return (
        <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />
      );
    },
    [rippleColor, rippleOpacity, rippleFades]
  );

  const touchableProps = {
    delayLongPress: props.delayLongPress,
    delayPressIn: props.delayPressIn,
    delayPressOut: props.delayPressOut,
    disabled,
    hitSlop: props.hitSlop,
    pressRetentionOffset: props.pressRetentionOffset,
    testID: props.testID,
    accessible: props.accessible,
    accessibilityHint: props.accessibilityHint,
    accessibilityLabel: props.accessibilityLabel,
    onLayout: handleLayout,
    onPress: handlePress,
    onPressIn,
    onPressOut,
    onLongPress: onLongPress ? handleLongPress : undefined,
    ...(Platform.OS !== 'web' ? { nativeID: props.nativeID } : null),
  };

  const containerStyle = {
    borderRadius: rippleContainerBorderRadius,
  };

  return (
    <TouchableWithoutFeedback {...touchableProps}>
      <Animated.View {...otherProps} pointerEvents="box-only">
        {children}
        <View style={[styles.container, containerStyle]}>
          {ripples.map(renderRipple)}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
