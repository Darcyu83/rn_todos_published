/* eslint-disable prefer-destructuring */
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  call,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { EditIcon, TrashBinIcon } from '../../components/icons/pngs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo } from '../../redux/todos/types';
import {
  BORDER_RADIUS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../styles/constants';
import { CustomStyle } from '../../styles/shadowStyle';

const Container = styled.View`
  background-color: #333248;
  width: 100%;
  min-height: 30%;
  min-width: 100%;
  border-radius: ${BORDER_RADIUS}px;
  overflow: hidden;
  padding: 10px;
  justify-content: center;
`;

const RowContainer = styled.View`
  justify-content: space-between;
  width: 100%;
`;

const BtnWrapper = styled.View<{ right: number }>`
  width: ${25}px;
  height: ${25}px;
  z-index: 99;
  position: absolute;
  top: 10%;
  right: ${(props) => props.right}px;
  border-radius: 999px;
  background-color: #c0bcbc;
  border: 3px solid #ffd955;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;
const SubTitle = styled.Text`
  color: white;
`;
const CardContent = styled.Text`
  color: #c0bcbc;
  margin-bottom: 5px;
`;
interface IProps {
  todo: TTodo;

  index: number;
  onSwipeToDel: () => void;
  onPressToModify: () => void;
}

function TodoCardSwipeableRow({
  todo,
  index,
  onSwipeToDel,
  onPressToModify,
}: IProps) {
  const snapPoints = [-SCREEN_WIDTH * 0.9, -SCREEN_WIDTH / 2, 0];

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const buttonScale = useSharedValue(0);
  const startBtnScale = useSharedValue(0);

  const itemHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const heightAnimatedStyle = useAnimatedStyle(() => {
    const style = itemHeight.value !== 0 ? { height: itemHeight.value } : {};
    return style;
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  // swipeable with gesture-handler only
  const gesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
    })
    .onEnd((e) => {
      startX.value = translateX.value;
    });

  // swipeable with gesture-handler & reanimated
  const getSnapPoints = (
    currentX: number,
    velocity: number,
    points: number[]
  ) => {
    'worklet';

    const point = currentX + 0.1 * velocity;
    const deltas = points.map((p) => Math.abs(point - p));
    const minDelta = Math.min.apply(null, deltas);
    const result = points.filter((p) => Math.abs(point - p) === minDelta)[0];
    return result;
  };

  const gestureWithAnimated = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (e, ctx) => {
      // ctx.x = translateX.value;
    },
    onActive: (e, ctx) => {
      translateX.value = e.translationX + startX.value;

      buttonScale.value = interpolate(
        e.translationX + startX.value,
        [snapPoints[2], snapPoints[1], snapPoints[0]],
        [0, 1, 2]
      );
    },
    onEnd: (e, ctx) => {
      startX.value = translateX.value;

      console.log('velocity ====translationX ', e.velocityX, e.translationX);

      let snapPointX = 0;
      if (e.velocityX >= 5000) {
        snapPointX = snapPoints[0];
      } else {
        snapPointX = getSnapPoints(translateX.value, e.velocityX, snapPoints);
      }

      translateX.value = withTiming(snapPointX, {
        easing: Easing.inOut(Easing.ease),
      });

      buttonScale.value = withTiming(
        interpolate(
          translateX.value,
          [snapPoints[2], snapPoints[1], snapPoints[0]],
          [0, 1, 2]
        )
      );
      // runOnJS(onSwipeToDel)();
    },
  });

  return (
    // <GestureDetector gesture={gesture}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: '#dfd996',
            borderRadius: 9999,
            // padding: 10,
            position: 'absolute',
            right: 0,

            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
          scaleAnimatedStyle,
        ]}
      >
        {/* 삭제 버튼 */}
        {/* <BtnWrapper right={5}> */}
        <TouchableOpacity
          onPress={onSwipeToDel}
          style={{ width: 100, height: 100 }}
        >
          <TrashBinIcon width="100%" height="100%" />
        </TouchableOpacity>
        {/* </BtnWrapper> */}
        {/* 수정 버튼 */}
        {/* <BtnWrapper right={35}> */}
        <TouchableOpacity
          onPress={onPressToModify}
          style={{ width: 100, height: 100 }}
        >
          <EditIcon />
        </TouchableOpacity>
        {/* </BtnWrapper> */}
      </Animated.View>

      {/* Swipeable */}
      <PanGestureHandler onGestureEvent={gestureWithAnimated}>
        <Animated.View
          // eslint-disable-next-line no-return-assign
          style={[
            { width: '100%', marginBottom: 5, flexDirection: 'row' },
            CustomStyle.shadow,
            animatedStyle,
            heightAnimatedStyle,
          ]}
          onLayout={(e) => {
            if (!itemHeight.value) {
              // 0일때만
              itemHeight.value = withTiming(e.nativeEvent.layout.height);
            }
          }}
        >
          <Container>
            <RowContainer>
              {/* ROW1 :  타이틀 */}
              <CardTitle numberOfLines={2} adjustsFontSizeToFit>{`${
                todo.title.charAt(0).toUpperCase() + todo.title.slice(1)
              }`}</CardTitle>
            </RowContainer>

            {/* ROW2 :   내용 */}
            <RowContainer>
              {/* 카테고리 */}
              <ContentContainer>
                <SubTitle>Category : </SubTitle>
                <CardContent>
                  {todo.category.charAt(0).toUpperCase() +
                    todo.category.slice(1)}
                </CardContent>
              </ContentContainer>

              {/* 할일 디테일 */}
              <ContentContainer>
                <SubTitle>Details : </SubTitle>
                <CardContent>{todo.todo}</CardContent>
              </ContentContainer>

              {/* 기간 */}
              <ContentContainer>
                <SubTitle>Period : </SubTitle>
                <CardContent>
                  {todo.startDtData.dateString} ~ {todo.endDtData.dateString}
                </CardContent>
              </ContentContainer>
            </RowContainer>
          </Container>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default TodoCardSwipeableRow;
