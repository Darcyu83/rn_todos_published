import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, ScrollView, Text } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';
import styled from 'styled-components/native';
import TaskIndicator from '../../components/calendar/TaskIndicator';
import { TMarkedDatesCustomed } from '../../components/calendar/types';
import { PlusIcon } from '../../components/icons/pngs';
import { TStackScrnProps_Todos } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { OrangeTouchable } from '../../styles/styledComponents/components';
import { createScheduledDotMakredDates } from '../../utils/calendarUtils';
import TodoRegisModal from './TodoRegistModal';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const BtnWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: ${28}px;
  height: ${28}px;
`;

function TodosMainScrn(props: TStackScrnProps_Todos) {
  const { route, navigation } = props;

  const { list: todosList } = useAppSelector((state) => state.todos);

  const [markedDates, setMarkedDates] = useState<TMarkedDatesCustomed>({});

  // 할일 등록 모달
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  // 데일리 할일 디테일 화면으로 이동
  const onMoveToDailyTasks = (clickedDateData: DateData) => {
    navigation.navigate('TodosDetailedListScrn', { clickedDateData });
  };

  // 캘린더 스케쥴 마킹 데이터 생성
  useEffect(() => {
    const _markedDates = createScheduledDotMakredDates(todosList);
    // 마킹 날짜 및 스타일 매칭 정보 생성
    setMarkedDates(_markedDates);
  }, [todosList]);

  return (
    <SafeLinearAreaHOC>
      <Container>
        <ScrollView>
          {/* 할일 구분 */}
          <TaskIndicator />

          {/* 일정 달력 */}
          <CalendarScheduled
            markedDates={markedDates}
            onMoveToDailyTasks={onMoveToDailyTasks}
          />
        </ScrollView>
      </Container>

      {/* 등록 버튼 */}
      <BtnWrapper>
        <OrangeTouchable
          onPress={() => {
            setIsRegModalShown(true);
          }}
        >
          <PlusIcon />
        </OrangeTouchable>
      </BtnWrapper>

      {/* 일정 등록 모달 */}
      <TodoRegisModal
        visible={isRegModalShown}
        closeModal={() => {
          setIsRegModalShown(false);
          Keyboard.dismiss();
        }}
        taskIdBeModified={null}
      />
    </SafeLinearAreaHOC>
  );
}

export default TodosMainScrn;
