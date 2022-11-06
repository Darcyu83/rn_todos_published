import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import styled from 'styled-components/native';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import { TMarkedDatesCustomed } from '../../components/calendar/types';
import { PlusIcon } from '../../components/icons/pngs';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { TRootNavParamsList } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { TTodo } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';
import {
  OrangeTouchable,
  SafeAreaCustomized,
} from '../../styles/styledComponents/components';
import BedTimeSetScrn from '../bedTime/BedTimeSetScrn';
import TodoRegisModal from './TodoRegistModal';

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
`;

interface IProps {
  route: NativeStackScreenProps<TRootNavParamsList>['route'];
  navigation: NativeStackScreenProps<TTodosNavParams>['navigation'];
}

function TodosMainScrn({ route, navigation }: IProps) {
  const { list: todosList } = useAppSelector((state) => state.todos);
  const [markedDates, setMarkedDates] = useState<TMarkedDatesCustomed>({});

  // 할일 등록 모달
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  const onMoveToDailyTasks = (day: DateData) => {
    if (
      !markedDates[day.dateString] ||
      !markedDates[day.dateString].tskIds.length
    )
      return;

    // 리스트 생성
    let _dailyTasks: TTodo[] = [];

    markedDates[day.dateString].tskIds.map((id) => {
      const _numId = Number(id);
      const task = todosList[_numId].info;
      _dailyTasks = [..._dailyTasks, task];
    });

    navigation.navigate('TodosDetailedListScrn', { dailyTasks: _dailyTasks });
  };

  // 캘린더 스케쥴 마킹 데이터 생성
  useEffect(() => {
    // 캘린더 날짜 마킹 정보
    let _markedDates: TMarkedDatesCustomed = {};

    const taskIds = Object.keys(todosList);

    for (let tskId of taskIds) {
      let id = Number(tskId);
      const taskCate = todosList[id].info.category;
      const dateStringsArr = todosList[id].period;

      // 스타일 정보
      const cateStyle = DotStyle[taskCate];

      for (let i = 0; i < dateStringsArr.length; i++) {
        // 해당 날짜가 처음 등록

        if (!_markedDates[dateStringsArr[i]]) {
          _markedDates = {
            // 기존 날짜값 복사
            ..._markedDates,
            // 새로 추가할 날짜 추가 : 신규
            [dateStringsArr[i]]: {
              dots: [cateStyle],
              ...{ tskIds: [tskId] }, // 해당날짜 신규 타스크 : 카운트 1
            },
          };
          continue;
        }
        // 해당 날짜가 이미 등록
        const existingDots = _markedDates[dateStringsArr[i]].dots || [];
        // 카테고리 스타일 값이 이미 등록되어있는지 체크
        const _dots = existingDots.some((dotStyle) => dotStyle.key === taskCate)
          ? existingDots
          : existingDots.concat(cateStyle);

        _markedDates = {
          // // 기존 날짜값 복사
          ..._markedDates,
          // // 새로 추가할 날짜 추가 : 이미 추가되어 있음
          [dateStringsArr[i]]: {
            dots: _dots,
            tskIds: _markedDates[dateStringsArr[i]].tskIds.concat(tskId),
          },
        };
      }
    }
    // 마킹 날짜 및 스타일 매칭 정보 생성
    setMarkedDates(_markedDates);
  }, [todosList]);

  return (
    <SafeAreaCustomized>
      <Container>
        <ScrollView>
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
