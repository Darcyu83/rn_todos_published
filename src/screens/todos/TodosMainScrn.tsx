import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import {
  OrangeTouchable,
  ScrnTitle,
} from '../../styles/styledComponents/components';
import TodoRegisModal from './TodoRegistModal';

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
        <TodoRegisModal
          visible={isDatePickerModalShown}
          closeModal={() => setIsDatePickerModalShown(false)}
        />
      </Container>
    </SafeAreaView>
  );
}

export default TodosMainScrn;
