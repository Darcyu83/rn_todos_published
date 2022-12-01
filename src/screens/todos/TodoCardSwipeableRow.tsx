import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  Gesture,
  PanGestureHandler,
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
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { TTodo } from '../../redux/todos/types';
import {
  BORDER_RADIUS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../styles/constants';
import { CustomStyle } from '../../styles/shadowStyle';

const OutterContainer = styled.View<{ isLastItem: boolean | null }>`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS}px;
  margin-bottom: ${(props) => (props.isLastItem ? 0 : 5)}px;
  overflow: hidden;
`;

const Container = styled.Pressable`
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
  flex: 1;
  color: #c0bcbc;
  margin-bottom: 5px;
`;
interface IProps {
  todo: TTodo;

  isLastItem: boolean | null;
  removeItem: () => void;
  onPressToModify: () => void;
  onScroll: (y: number) => void;
}

function TodoCardSwipeableRow({
  todo,
  isLastItem,
  removeItem,
  onPressToModify,
  onScroll,
}: IProps) {
  // 아이템 초기 높이 설정 여부
  const isInitialHeightSet = useRef(false);

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const initialitemHeight = useSharedValue(0);
  const removableItemHeight = useSharedValue(0);

  // Swipe background content : delete View
  const buttonScale = useSharedValue(0);
  const arrowAnimated = useSharedValue(0);
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: arrowAnimated.value,
      },
    ],
  }));

  //  Sipe background Text Animated
  const FONT_SIZE = 14;

  const cardFlipAniamted = useSharedValue(0);

  const cardFrontFlipAniamtedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${withTiming(cardFlipAniamted.value)}deg`,
      },
    ],
  }));

  const cardBackFlipAniamtedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${cardFlipAniamted.value}deg` }],
  }));

  const translateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value, {
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  const heightAnimatedStyle = useAnimatedStyle(() => {
    if (initialitemHeight.value !== 0)
      return {
        height: withTiming(
          initialitemHeight.value - removableItemHeight.value,
          { easing: Easing.inOut(Easing.ease) }
        ),
      };

    return {};
  });

  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(buttonScale.value) }],
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

      buttonScale.value = interpolate(newTranslateX, snapPoints, [3, 1, 0]);

      cardFlipAniamted.value = interpolate(
        newTranslateX,
        [(-SCREEN_WIDTH * 2) / 3, -SCREEN_WIDTH / 2, 0],
        [180, 0, 0]
      );

      runOnJS(onScroll)(e.translationY);
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

      buttonScale.value = interpolate(snapPointX, snapPoints, [3, 1, 0]);

      cardFlipAniamted.value = interpolate(
        snapPointX,
        [(-SCREEN_WIDTH * 2) / 3, -SCREEN_WIDTH / 2, 0],
        [180, 0, 0]
      );

      // 높이 0 후 리덕스 데이터 처리
      if (snapPointX === snapPoints[0]) {
        removableItemHeight.value = initialitemHeight.value;
        runOnJS(removeItem)();
      }
    },
  });

  useEffect(() => {
    arrowAnimated.value = withRepeat(
      withTiming(-10, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      Infinity,
      true
    );

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <GestureDetector gesture={}>

    <OutterContainer isLastItem={isLastItem}>
      <Animated.View
        style={[
          {
            backgroundColor: 'crimson',
            borderRadius: 9999,
            width: '50%',
            height: '100%',
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          scaleAnimatedStyle,
        ]}
      >
        {/* Swipe background Items  */}
        <TouchableOpacity
          onPress={() => {
            removableItemHeight.value = initialitemHeight.value;
            removeItem();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* text Card flip here   "Swipe to delete"  "Delete"  */}
          <View
            style={[
              {
                width: '80%',
                height: '80%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backfaceVisibility: 'hidden',
              },
            ]}
          >
            {/* text item1 front face */}

            <Animated.View style={[arrowAnimatedStyle]}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >{`<<`}</Text>
            </Animated.View>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: FONT_SIZE,
              }}
            >
              delete
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Swipeable */}
      <PanGestureHandler onGestureEvent={gestureWithAnimated}>
        <Animated.View
          // eslint-disable-next-line no-return-assign
          style={[
            { width: '100%', flexDirection: 'row' },
            CustomStyle.shadow,
            translateAnimatedStyle,
            heightAnimatedStyle,
          ]}
          onLayout={(e) => {
            if (!isInitialHeightSet.current) {
              // 첫 로딩일 경우 셋팅
              initialitemHeight.value = e.nativeEvent.layout.height;

              isInitialHeightSet.current = true;
            }
          }}
        >
          <Container onPress={onPressToModify}>
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
    </OutterContainer>
  );
}

export default TodoCardSwipeableRow;
