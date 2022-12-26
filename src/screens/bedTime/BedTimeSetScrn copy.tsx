import React, { useEffect, useMemo } from 'react';
import { Animated, Text, View } from 'react-native';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

interface IProps {}
const AnimatedPath = Animated.createAnimatedComponent(Path);

// function convertToFixed(m, integer, decimal = '', sign, power) {
//   const fixed = integer + decimal;
//   return sign === '+'
//     ? fixed + '0'.repeat(power - decimal.length)
//     : '0.' + '0'.repeat(power - 1) + fixed;
// }

// function exponentialToFixedNotation(num) {
//   return num.replace(/(\d)(?:\.(\d+))?e([+-])(\d+)/g, convertToFixed);
// }

function BedTimeSetScrn({
  data,
  innerRadius,
  outerRadius,
  padAngle,
  animate,
  animationDuration,
  valueAccessor,
  size,
  colors,
  id,
}: any) {
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  // const arcGenerator = arcShape()
  //   .outerRadius(outerRadius)
  //   .innerRadius(innerRadius)
  //   .padAngle(padAngle);

  useEffect(() => {
    const anim = Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false, // also tried true
    });

    anim.start();

    return () => anim.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const pieSlices = pieShape().value((d) => valueAccessor(d))(data);

  return (
    <Svg style={{ height: size, width: size }}>
      <G x={size / 2} y={size / 2}>
        {/* {pieSlices.map((slice, index) => {
          const startPath = arcGenerator({
            ...slice,
            startAngle: 0,
            endAngle: 0,
          });
          const endPath = arcGenerator(slice);
          const outputRange = [startPath, endPath].map(
            exponentialToFixedNotation
          );
          return (
            <AnimatedPath
              d={animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange,
              })}
              fill={colors[index]}
            />
          );
        })} */}
      </G>
    </Svg>
  );
}

export default BedTimeSetScrn;
