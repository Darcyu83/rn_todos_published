import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import DateString from '../../utils/dateUtils';

const ArrowTouchable = styled.TouchableOpacity``;

interface IProps {
  direction: 'left' | 'right';
  setInitialDate: React.Dispatch<React.SetStateAction<string>>;
}

function CalendarArrow({ direction, setInitialDate }: IProps) {
  useEffect(() => {
    console.log('direction', direction);
  }, [direction]);

  return (
    <ArrowTouchable
      onPress={() => {
        const monthIncre = direction === 'left' ? -1 : 1;
        setInitialDate((initialDate) =>
          DateString.convertDateToYYYYMMDD(new Date(initialDate), 0, monthIncre)
        );
      }}
    >
      <Text style={{ fontSize: 18 }}>{direction === 'right' ? '▶' : '◀'}</Text>
    </ArrowTouchable>
  );
}

export default CalendarArrow;
