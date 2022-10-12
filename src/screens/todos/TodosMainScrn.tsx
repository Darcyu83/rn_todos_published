import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import CalendarDatePickerModal from '../../components/calendar/CalendarDatePickerModal';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  OrangeTouchable,
  ScrnTitle,
} from '../../styles/styledComponents/components';
import CircularScheduleTable from './circularScheduled/CircularScheduleTable';

import TodoCard from './TodoCard';
import TodoInput from './TodoInput';

const Container = styled.View`
  padding: 10px;
`;

interface IProps {}

function TodosMainScrn({}: IProps) {
  const [isDatePickerModalShown, setIsDatePickerModalShown] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {/* <CircularScheduleTable /> */}
        <ScrnTitle>TodosMainScrn</ScrnTitle>

        {/* 일정 달력 */}
        <CalendarScheduled />

        <OrangeTouchable
          onPress={() => {
            setIsDatePickerModalShown(true);
          }}
        >
          <Text>Regist new Todos</Text>
        </OrangeTouchable>

        {/* 일정 등록 모달 */}
        <CalendarDatePickerModal
          visible={isDatePickerModalShown}
          closeModal={() => setIsDatePickerModalShown(false)}
        />
      </Container>
    </SafeAreaView>
  );
}

export default TodosMainScrn;
