import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Mask, Path, Rect } from 'react-native-svg';

interface IProps {}

function SvgWaveTest({}: IProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 150 150"
      preserveAspectRatio="xMidYMid meet"
    >
      <Mask id="myMask">
        <Rect x={-10} y={0} width="110%" height="110%" fill="white" />
        <Rect x={10} y={10} width="100%" height="100%" fill="black" />
      </Mask>
      <Rect x={0} y={0} width="100%" height="100%" fill="crimson" />
      <Path
        d="M -10 75 C 50 20 100 130 150 75"
        stroke="white"
        strokeWidth={5}
      />

      <Rect
        x={-10}
        y={0}
        width="100%"
        height="100%"
        fill="black"
        mask="url(#myMask)"
      />
    </Svg>
  );
}

export default SvgWaveTest;
