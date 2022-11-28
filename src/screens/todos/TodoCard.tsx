import React from 'react';
import { Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TTodo } from '../../redux/todos/types';
import { SCREEN_WIDTH } from '../../styles/constants';
import { getSnapPoints } from '../../utils/reanimatedUtils';

interface IProps {
  todo: TTodo;

  isLastItem: boolean | null;
  setTaskIdBeDeleted: () => void;
  onPressToModify: () => void;
}

function TodoCard({
  todo,
  isLastItem,
  setTaskIdBeDeleted,
  onPressToModify,
}: IProps) {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  //   const heightItemDel = useSharedValue(false);

  const heightItemDel = useSharedValue(30);

  const translateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  const heightAnimatedStyle = useAnimatedStyle(() =>
    heightItemDel.value
      ? {
          height: withTiming(heightItemDel.value, {
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
          }),
        }
      : {}
  );

  // swipeable with gesture-handler & reanimated

  const snapPoints = [-SCREEN_WIDTH * 0.9, -SCREEN_WIDTH / 2, 0];
  const gestureWithAnimated = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (e, ctx) => {
      // ctx.x = translateX.value;
    },
    onActive: (e, ctx) => {
      const newTranslateX = e.translationX + startX.value;
      translateX.value = newTranslateX;
    },
    onEnd: (e, ctx) => {
      let snapPointX = 0;
      if (e.velocityX >= 8000) {
        // eslint-disable-next-line prefer-destructuring
        snapPointX = snapPoints[0];
      } else {
        snapPointX = getSnapPoints(translateX.value, e.velocityX, snapPoints);
      }

      startX.value = snapPointX;
      translateX.value = snapPointX;

      heightItemDel.value = interpolate(snapPointX, snapPoints, [10, 100, 300]);

      //   if (snapPointX === snapPoints[0]) heightItemDel.value = true;
    },
  });

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: 'tomato',
          marginBottom: 10,
          height: 300,
        },
      ]}
    >
      <PanGestureHandler onGestureEvent={gestureWithAnimated}>
        <Animated.View
          onLayout={(e) => e.nativeEvent.layout.height}
          style={[
            {
              width: '100%',
              backgroundColor: 'tomato',
              marginBottom: 10,
              height: 300,
            },
            heightAnimatedStyle,
          ]}
        >
          <Animated.View style={{ width: '100%' }}>
            <Animated.Text
              onPress={() => {
                setTaskIdBeDeleted();
              }}
              style={[{ backgroundColor: 'white' }, translateAnimatedStyle]}
            >
              {todo.title}
              {todo.id}
            </Animated.Text>
            <Animated.Text
              style={[{ backgroundColor: 'black', color: 'white' }]}
            >
              {todo.title}
              {todo.id}
            </Animated.Text>
            <Animated.Text
              style={[{ backgroundColor: 'black', color: 'white' }]}
            >
              {todo.title}
              {todo.id}
            </Animated.Text>
            <Animated.Text
              style={[{ backgroundColor: 'black', color: 'white' }]}
            >
              {todo.title}
              {todo.id}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default TodoCard;
