import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import styled from 'styled-components/native';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import TaskIndicator from '../../components/calendar/TaskIndicator';
import { TMarkedDatesCustomed } from '../../components/calendar/types';
import { PlusIcon } from '../../components/icons/pngs';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { TRootNavParamsList } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { TTodo } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';
import { ICON_SIZE } from '../../styles/constants';
import {
  OrangeTouchable,
  SafeAreaCustomized,
} from '../../styles/styledComponents/components';
import {
  createPeriodMarkedDates,
  createScheduledDotMakredDates,
} from '../../utils/calendarUtils';
import BedTimeSetScrn from '../todosFirestore/TodosFirestoreScrn';
import TodoRegisModal from './TodoRegistModal';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;
const ToggleThemeView = styled.View`
  background-color: ${(props) => props.theme.content_bg_primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: ${28}px;
  height: ${28}px;
`;

interface IProps {
  route: NativeStackScreenProps<TRootNavParamsList>['route'];
  navigation: NativeStackScreenProps<TTodosNavParams>['navigation'];
}

function TodosMainScrn({ route, navigation }: IProps) {
  const user = useAppSelector((state) => state.user);
  const { list: todosList } = useAppSelector((state) => state.todos);
  const [markedDates, setMarkedDates] = useState<TMarkedDatesCustomed>({});

  // 할일 등록 모달
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  const onMoveToDailyTasks = (clickedDateData: DateData) => {
    navigation.navigate('TodosDetailedListScrn', {
      clickedDateData,
    });
  };

  // 캘린더 스케쥴 마킹 데이터 생성
  useEffect(() => {
    const _markedDates = createScheduledDotMakredDates(todosList);
    // 마킹 날짜 및 스타일 매칭 정보 생성
    setMarkedDates(_markedDates);
  }, [todosList]);

  // firebase data changes listener
  useEffect(() => {
    if (!user.info.userNm) return;
    console.log('onSnapshot useEffect here ran', user.info.userNm);

    let dataMap: { [taskId: number]: TTodo } = {};

    firestore()
      .collection(user.info.userNm)
      .onSnapshot((qeurySnapshot) => {
        console.log(
          '%c path : ./userEmail/',
          'background-color: orange',
          qeurySnapshot.metadata
        );
      });

    firestore()
      .collection(user.info.userNm)
      .doc('todoList')
      .onSnapshot((docUpdated) =>
        console.log(
          '%c path : ./userEmail/todoList/',
          'background-color: orange',
          docUpdated.metadata
        )
      );

    return () => {
      console.log('onSnapshot useEffect unsubscriber here ran');
    };
  }, [user.info.userNm]);

  return (
    <SafeAreaCustomized>
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
        closeModal={() => setIsRegModalShown(false)}
        taskModified={null}
      />
    </SafeAreaCustomized>
  );
}

export default TodosMainScrn;
