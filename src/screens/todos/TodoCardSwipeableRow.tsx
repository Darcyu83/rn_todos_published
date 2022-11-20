import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
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
  onPressToModify: () => void;
}

function TodoCardSwipeableRow({ todo, index, onPressToModify }: IProps) {
  const { userId } = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();

  const onRemoveTodohandler = async () => {
    if (!userId) return;

    try {
      dispatch(todosActions.deleteTodo({ taskId: todo.id }));
    } catch (error) {
      console.log(
        '%c Remove todo ==== error:: ',
        'background-color: tomato',
        error
      );
    }
  };

  const rotateAni = useRef(new Animated.Value(0));

  useEffect(() => {}, [index]);

  // swipeable with gesture-handler only

  const snapPoints = [-SCREEN_WIDTH * 0.9, -SCREEN_WIDTH / 2, 0];

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const velocityX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {})
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
    })
    .onEnd((e) => {
      startX.value = translateX.value;
      velocityX.value = e.velocityX;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, { velocity: velocityX.value }),
      },
    ],
  }));

  // swipeable with gesture-handler & reanimated
  const getSnapPoints = (
    tanslateX: number,
    velocity: number,
    points: number[]
  ) => {
    'worklet';

    console.log('tanslateX', tanslateX, 'velocity', velocity, 'points', points);
    const point = tanslateX + 0.2 * velocity;
    console.log('point', point);
    const deltas = points.map((p) => Math.abs(point - p));
    console.log('deltas', deltas);
    const minDelta = Math.min.apply(null, deltas);
    console.log('minDelta', minDelta);
    const result = points.filter((p) => Math.abs(point - p) === minDelta)[0];
    console.log('result', result);
    return result;
  };
  const gestureWithAnimated = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (event, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.x;
    },
    onEnd: (e, ctx) => {
      const snapPointX = getSnapPoints(
        translateX.value,
        e.velocityX,
        snapPoints
      );

      translateX.value = withSpring(snapPointX, { velocity: e.velocityX });
    },
  });

  return (
    // <GestureDetector gesture={gesture}>
    <PanGestureHandler onGestureEvent={gestureWithAnimated}>
      <Animated.View
        style={[
          { width: '100%', marginBottom: 5 },
          CustomStyle.shadow,
          animatedStyle,
        ]}
      >
        <Container>
          <RowContainer>
            {/* ROW1 :  타이틀 */}
            <CardTitle numberOfLines={2} adjustsFontSizeToFit>{`${
              todo.title.charAt(0).toUpperCase() + todo.category.slice(1)
            }`}</CardTitle>
          </RowContainer>

          {/* ROW2 :   내용 */}
          <RowContainer>
            {/* 카테고리 */}
            <ContentContainer>
              <SubTitle>Category : </SubTitle>
              <CardContent>
                {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
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

        {/* 수정 버튼 */}
        {/* <BtnWrapper right={35}>
          <TouchableOpacity onPress={onPressToModify}>
            <EditIcon />
          </TouchableOpacity>
        </BtnWrapper> */}

        {/* 삭제 버튼 */}
        {/* <BtnWrapper right={5}>
          <TouchableOpacity
            onPress={async () => {
              await onRemoveTodohandler();
            }}
          >
            <TrashBinIcon width="100%" height="100%" />
          </TouchableOpacity> 
        </BtnWrapper> */}
      </Animated.View>
    </PanGestureHandler>
  );
}

export default TodoCardSwipeableRow;
