import React, { useEffect } from 'react';
import { MaskedViewComponent, SafeAreaView, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Polygon,
  Rect,
  Stop,
  Text,
  Use,
} from 'react-native-svg';
import { transformer } from '../../../metro.config';
import { SCREEN_WIDTH } from '../../styles/constants';

interface IProps {
  bgColor?: string;
}

function WaveSVG({ bgColor = 'white' }: IProps) {
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const SVG_SIZE = 300;
  const X_WAVE_PEAK_1 = SVG_SIZE * 0.3;
  const X_WAVE_PEAK_2 = SVG_SIZE * 0.5;
  const X_WAVE_PEAK_3 = SVG_SIZE * 0.7;

  const Y_WAVE_HEIGHT_PEAK = SVG_SIZE * 0.1;
  const Y_WAVE_HEIGHT_VALLEY = SVG_SIZE * 0.9;

  const progressWave1 = useSharedValue(0);
  const progressWave2 = useSharedValue(0);

  useEffect(() => {
    progressWave1.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      Infinity,
      true
    );
    progressWave2.value = withDelay(
      300,
      withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        Infinity,
        true
      )
    );
  }, [progressWave1, progressWave2]);

  const dataWave1 = useDerivedValue(() => ({
    from: {
      x: -100,
      y: interpolate(
        progressWave2.value,
        [0, 1],
        [SVG_SIZE / 2 + 20, SVG_SIZE / 2 - 10]
      ),
    },

    ctrlPoint1: {
      x: interpolate(
        progressWave1.value,
        [0, 1],
        [X_WAVE_PEAK_1 * 0.3, X_WAVE_PEAK_1 * 1.5]
      ),
      y: interpolate(
        progressWave1.value,
        [0, 1],
        [Y_WAVE_HEIGHT_VALLEY, Y_WAVE_HEIGHT_PEAK]
      ),
    },
    ctrlPoint2: {
      x: interpolate(
        progressWave1.value,
        [0, 1],
        [X_WAVE_PEAK_2 * 0.4, X_WAVE_PEAK_2 * 1.5]
      ),
      y: interpolate(
        progressWave1.value,
        [0, 1],
        [Y_WAVE_HEIGHT_PEAK, Y_WAVE_HEIGHT_VALLEY * 1.3]
      ),
    },
    ctrlPoint3: {
      x: interpolate(
        progressWave1.value,
        [0, 1],
        [X_WAVE_PEAK_3 * 0.5, X_WAVE_PEAK_3 * 1.5]
      ),

      y: interpolate(
        progressWave1.value,
        [0, 1],
        [Y_WAVE_HEIGHT_PEAK, Y_WAVE_HEIGHT_VALLEY * 0.8]
      ),
    },
    to: {
      x: SVG_SIZE + 100,
      y: interpolate(
        progressWave2.value,
        [0, 1],
        [SVG_SIZE / 2 - 20, SVG_SIZE / 2 + 10]
      ),
    },
  }));

  const dataWave2 = useDerivedValue(() => ({
    from: {
      x: -100,
      y: interpolate(
        progressWave2.value,
        [0, 1],
        [SVG_SIZE / 2 - 10, SVG_SIZE / 2 + 5]
      ),
    },
    ctrlPoint1: {
      x: interpolate(
        progressWave2.value,
        [0, 1],
        [X_WAVE_PEAK_1, X_WAVE_PEAK_1 * 0.7]
      ),
      y: interpolate(
        progressWave2.value,
        [0, 1],
        [Y_WAVE_HEIGHT_VALLEY, Y_WAVE_HEIGHT_PEAK]
      ),
    },
    ctrlPoint2: {
      x: interpolate(
        progressWave1.value,
        [0, 1],
        [X_WAVE_PEAK_2, X_WAVE_PEAK_3 * 0.8]
      ),
      y: interpolate(
        progressWave1.value,
        [0, 1],
        [Y_WAVE_HEIGHT_PEAK, Y_WAVE_HEIGHT_VALLEY * 0.8]
      ),
    },
    ctrlPoint3: {
      x: X_WAVE_PEAK_3,

      y: interpolate(
        progressWave2.value,
        [0, 1],
        [Y_WAVE_HEIGHT_PEAK, Y_WAVE_HEIGHT_VALLEY * 0.8]
      ),
    },
    to: {
      x: SVG_SIZE + 100,
      y: interpolate(
        progressWave2.value,
        [0, 1],
        [SVG_SIZE / 2 + 5, SVG_SIZE / 2 - 10]
      ),
    },
  }));

  const pathWave1 = useAnimatedProps(() => {
    const { from, ctrlPoint1, ctrlPoint3, to } = dataWave1.value;
    return {
      d: `M ${from.x} ${from.y} C ${ctrlPoint1.x} ${ctrlPoint1.y} ${ctrlPoint3.x} ${ctrlPoint3.y} ${to.x} ${to.y} L ${SVG_SIZE} ${SVG_SIZE} L 0 ${SVG_SIZE} Z`,
    };
  });

  const pathWave2 = useAnimatedProps(() => {
    const { from, ctrlPoint1, ctrlPoint3, to } = dataWave2.value;

    return {
      d: `M ${from.x} ${from.y} C ${ctrlPoint1.x} ${ctrlPoint1.y} ${
        ctrlPoint3.x
      } ${ctrlPoint3.y} ${to.x} ${to.y} L ${
        SVG_SIZE + 100
      } ${SVG_SIZE} L -100 ${SVG_SIZE} Z`,
    };
  });

  return (
    <Svg width="100%" height="100%" viewBox="-90 1 400 300">
      <Mask id="CircleMask">
        <Rect x={-10} y={-10} width={350} height={350} fill="white" />
        {/* <Rect x={-10} y={-10} width="309" height="309" fill="black" /> */}
        <Circle
          cx={SVG_SIZE / 2 + 2}
          cy={SVG_SIZE / 2}
          r={SVG_SIZE / 2}
          fill="black"
        />
      </Mask>
      <G>
        <Rect x={-90} y={0} width={400} height={300} fill="dodgerblue" />
        <AnimatedPath
          id="wave1"
          fill="rgba(255,255,255,0.6)"
          animatedProps={pathWave1}
        />
        <AnimatedPath id="wave2" fill="#4f4ffa" animatedProps={pathWave2} />
      </G>

      {/* <Rect
        x={-30}
        y={-30}
        width={350}
        height={350}
        fill={bgColor}
        // stroke={bgColor}
        // strokeWidth={3}
        mask="url(#CircleMask)"
      /> */}
    </Svg>
  );
}

export default WaveSVG;
