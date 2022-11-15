import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import DateString from '../../utils/dateUtils';

const ArrowTouchable = styled.TouchableOpacity``;

interface IProps {
  direction: 'left' | 'right';
}

function CalendarArrow({ direction }: IProps) {
  return (
    <View>
      <Text style={{ fontSize: 18, color: 'rgba(0,0,0,0.4)' }}>
        {direction === 'right' ? '▶' : '◀'}
      </Text>
    </View>
  );
}

export default CalendarArrow;
