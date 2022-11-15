import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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
`;
interface IProps {
  title: string;
}

function TopHeaderTitle({ title }: IProps) {
  const animated1 = useSharedValue(400);
  const animated2 = useSharedValue(400);
  const rotateAnimated = useSharedValue(0);
  const scaleAnimated = useSharedValue(10);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: animated1.value },
      { rotateX: `${rotateAnimated.value}deg` },
      { scale: scaleAnimated.value },
    ],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateX: animated2.value }],
  }));

  useEffect(() => {
    animated1.value = withDelay(
      1000,
      withTiming(0, {
        duration: 2000,
      })
    );

    animated2.value = withDelay(
      500,
      withTiming(0, {
        duration: 2000,
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
  }, [animated1, animated2, rotateAnimated, scaleAnimated]);

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
            color: GlobalTheme().text,
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
