import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Easing,
  timing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { SCREEN_WIDTH } from '../../styles/constants';
import { GlobalTheme, theme } from '../../styles/theme';

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  background-color: transparent;
`;
interface IProps {
  title: string;
}

function TopHeaderTitle({ title }: IProps) {
  const capitalLetterAnimated = useSharedValue(400);
  const nonCapitalizedLetterAnimated = useSharedValue(400);
  const rotateAnimated = useSharedValue(0);
  const scaleAnimated = useSharedValue(10);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: capitalLetterAnimated.value },
      { rotateX: `${rotateAnimated.value}deg` },
      { scale: scaleAnimated.value },
    ],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: nonCapitalizedLetterAnimated.value }],
  }));

  useEffect(() => {
    capitalLetterAnimated.value = withDelay(
      1500,
      withTiming(0, {
        duration: 1000,
      })
    );

    nonCapitalizedLetterAnimated.value = withDelay(
      500,
      withTiming(0, {
        duration: 1000,
      })
    );

    rotateAnimated.value = withRepeat(
      withTiming(-360, { duration: 1000 }),
      3,
      false
    );

    scaleAnimated.value = withRepeat(
      withDelay(1800, withTiming(1, { duration: 1000 })),
      1,
      false
    );
  }, [
    capitalLetterAnimated,
    nonCapitalizedLetterAnimated,
    rotateAnimated,
    scaleAnimated,
  ]);

  return (
    <Container>
      <Animated.Text
        style={[
          {
            fontSize: 24,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'red',
          },
          animatedStyle1,
        ]}
      >
        {title.charAt(0)}
      </Animated.Text>
      <Animated.Text
        style={[
          {
            fontSize: 18,
            color: GlobalTheme().text_white,
          },
          animatedStyle2,
        ]}
      >
        {title.slice(1)}
      </Animated.Text>
    </Container>
  );
}

export default TopHeaderTitle;
