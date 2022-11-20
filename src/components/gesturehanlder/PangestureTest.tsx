import React, { useRef } from 'react';
import { Text, View } from 'react-native';

import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface IProps {}

function PangestureTest({}: IProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((e) => {})
    .onStart((e) => {})
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd((e) => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onFinalize((e) => {});

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value) },
      { translateY: withSpring(translateY.value) },
    ],
  }));
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: 'teal',
          },
          animatedStyle,
        ]}
      >
        <Text>PangestureTest</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default PangestureTest;
