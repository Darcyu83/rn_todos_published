import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../styles/constants';
import WaveSVG from './WaveSVG';

interface IProps {}

function SplashScrn({}: IProps) {
  const animated = useSharedValue(SCREEN_HEIGHT);
  const opacityAnimated = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animated.value,
    opacity: opacityAnimated.value,
  }));

  useEffect(() => {
    animated.value = withTiming(0, { duration: 3000 });
    opacityAnimated.value = withDelay(3000, withTiming(0, { duration: 1000 }));
  }, [animated, opacityAnimated]);

  return (
    // <Animated.View
    //   style={[
    //     {
    //       width: '100%',
    //     },
    //     animatedStyle,
    //   ]}
    // >
    <View style={{ flex: 1, backgroundColor: 'crimson' }}>
      <View
        style={[
          {
            backgroundColor: 'purple',
            //   position: 'absolute',
            width: SCREEN_WIDTH,
            height: '100%',
            borderWidth: 1,
            borderColor: 'crimson',
            flexDirection: 'row',
            alignItems: 'flex-end',
            //   justifyContent: 'flex-end',
            // opacity: 0.3,
          },
        ]}
      >
        <WaveSVG />
      </View>
      {/* <View
        style={[
          {
            backgroundColor: 'red',

            //   justifyContent: 'flex-end',
            //   opacity: 0.3,
          },
        ]}
      /> */}
    </View>
    // </Animated.View>
  );
}

export default SplashScrn;
