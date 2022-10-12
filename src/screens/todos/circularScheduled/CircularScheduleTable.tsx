import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View<{
  containerXY: number;
}>`
  width: ${(prosp) => 200}px;
  height: ${(prosp) => 200}px;
  /* width: ${(prosp) => prosp.containerXY}px;
  height: ${(prosp) => prosp.containerXY}px; */
`;

const CircularTable = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  /* overflow: hidden; */
  background-color: dodgerblue;
  justify-content: center;
  align-items: center;
`;

const Devider = styled.View<{
  index: number;
  containerXY: number;
}>`
  z-index: ${(props) => props.index};

  position: absolute;
  width: 0;
  height: 0;
  top: 50%;

  left: 50%;
  background-color: transparent;
  border-style: solid;
  border-top-width: ${(props) => 100}px;
  /* border-left-width: ${(props) => 100}px; */
  border-right-width: ${(props) => 200 * 1.3}px;
  border-bottom-width: ${(props) => 100}px;

  /* border-top-width: ${(props) => props.containerXY}px; */
  /* border-left-width: ${(props) => props.containerXY}px;  */
  /* border-right-width: ${(props) => props.containerXY * 2}px; */
  /* border-bottom-width: ${(props) => props.containerXY}px; */
  /* border-top-color: rgba(0, 0, 0, 0.4);
  border-left-color: rgba(0, 0, 255, 0.4);
  border-bottom-color: rgba(255, 0, 0, 0.4); */
  border-top-color: transparent;
  border-right-color: rgba(0, 255, 0, 0.4);
  border-bottom-color: transparent;
`;

interface IProps {
  containerXY?: number;
}

function CircularScheduleTable({
  containerXY = Dimensions.get('screen').width - 20,
}: IProps) {
  const animateRef = useRef<Animated.Value>(new Animated.Value(0));

  const [animation, setAnimation] = useState<Animated.CompositeAnimation>(
    Animated.timing(animateRef.current, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    })
  );

  const conicWSize = containerXY * 1.3;
  const degPerHour = 360 / 24;
  const startTime = 22;
  const endTime = 23;

  useEffect(() => {
    // Animated.loop(_animation, {}).start();
  }, []);
  return (
    <Container containerXY={containerXY}>
      {/* CUSTOMIZED */}
      <Text
        onPress={() => {
          console.log(
            'haha',
            `${startTime % 12}시`,
            `${degPerHour * startTime}deg`
          );
          animation.reset();
          animation.start();
        }}
        style={{ width: '100%', height: 50, backgroundColor: 'lightgreen' }}
      >
        Click to start animated
      </Text>

      <CircularTable style={{ transform: [{ rotate: '-90deg' }] }}>
        {[...Array(2)].map((notUsed, idx) => (
          <Devider
            key={`aa${idx.toString()}`}
            index={idx}
            containerXY={containerXY}
            style={[
              {
                transform: [
                  { translateX: (-200 * 1.3) / 2 },
                  { translateY: -200 / 2 },
                  { rotate: `${degPerHour * idx + 22.5}deg` },
                  { translateX: (200 * 1.3) / 2 },
                  { translateY: 0 },
                ],
              },
            ]}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{idx}</Text>
          </Devider>
        ))}
        {/* <Animated.View
          style={[
            {
              width: containerXY,
              height: containerXY,
              top: containerXY / 2,
              left: containerXY / 2,
              backgroundColor: 'tomato',
              position: 'absolute',
            },
            {
              transform: [
                { translateX: -containerXY / 2 },
                { translateY: -containerXY / 2 },

                {
                  rotateZ: animateRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      '0deg',
                      `${(degPerHour * startTime) % 360}deg`,
                    ],
                  }),
                },

                { translateX: containerXY / 2 },
                { translateY: containerXY / 2 },
              ],
            },
          ]}
        >
          <Text>
            {startTime % 12}시: {`${degPerHour * startTime - 360}deg`}
          </Text>
        </Animated.View> */}
      </CircularTable>
    </Container>
  );
}

export default CircularScheduleTable;
