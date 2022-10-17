import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import CalendarDatePicker from '../../components/calendar/CalendarDatePicker';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import {
  ModalTranspBgView,
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';
import { IPeriod } from './types';

const CalendarWrapper = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const TodoInputWrapper = styled.View`
  width: 100%;
`;

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

const periodInitialState = {
  startDtData: null,
  endDtData: null,
};
function TodoRegistModal({ visible, closeModal }: IProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [{ startDtData, endDtData }, setPeriodData] =
    useState<IPeriod>(periodInitialState);

  const onResetStates = () => {
    setTodoTitle('');
    setTodoContent('');
    setPeriodData(periodInitialState);
  };

  const dispatch = useAppDispatch();

  const onAddTodoHandler = () => {
    if (!todoTitle) {
      Alert.alert('No Title');
      return;
    }
    if (!startDtData) {
      Alert.alert('No Start Date');
      return;
    }
    dispatch(
      todosActions.addTodo({
        category: 'vacation',
        isInSingleDay: true,
        id: new Date().getTime(),
        title: todoTitle,
        todo: todoContent,
        startDtData,
        endDtData: endDtData || startDtData,
      })
    );
    onResetStates();
  };

  useEffect(
    () => () => {
      onResetStates();
    },
    []
  );

  return (
    <Modal transparent visible>
      <ModalTranspBgView>
        {/* 닫기 버튼 */}
        {/* <BtnClosingContainer
          onPress={() => {
            closeModal();
          }}
        >
          <Text>X</Text>
        </BtnClosingContainer> */}

        {/* 달력 날짜 픽커 */}
        <ScrollView
          style={{ width: '100%', backgroundColor: 'yellow' }}
          contentContainerStyle={{ padding: 10 }}
        >
          {/* 날짜 선택 */}
          <CalendarWrapper>
            <CalendarDatePicker
              startDtData={startDtData}
              endDtData={endDtData}
              setPeriod={setPeriodData}
            />
          </CalendarWrapper>

          {/* 데이터 입력 */}

          <TodoInputWrapper>
            {/* 할일 타이틀 */}
            <SectionTitle>Todo Title</SectionTitle>
            <TextInput
              value={todoTitle}
              onChangeText={(txt) => setTodoTitle(txt)}
            />

            {/* 할일 내용 */}
            <SectionTitle>What to do</SectionTitle>
            <TextInput value={todoContent} onChangeText={setTodoContent} />
            {/* 시작일  */}
            <SectionTitle>Start Date</SectionTitle>
            <TextInput value={startDtData?.dateString} />
            {/* 종료일  */}
            <SectionTitle>End Date</SectionTitle>
            <TextInput value={endDtData?.dateString} />
          </TodoInputWrapper>
        </ScrollView>

        {/* 일정 등록 버튼 */}
        <KeyboardAvoidingView>
          <OrangeTouchable onPress={onAddTodoHandler}>
            <SectionTitle>Click to Add</SectionTitle>
          </OrangeTouchable>
        </KeyboardAvoidingView>
      </ModalTranspBgView>
    </Modal>
  );
}

export default TodoRegistModal;
