import React, { useState } from 'react';
import {
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

function TodoRegistModal({ visible, closeModal }: IProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [{ startDtData, endDtData }, setPeriodData] = useState<IPeriod>({
    startDtData: null,
    endDtData: null,
  });

  const dispatch = useAppDispatch();

  const onAddTodoHandler = () => {
    if (!todoTitle) return;
    if (!startDtData) return;
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
    setTodoTitle('');
    setTodoContent('');
  };
  return (
    <Modal transparent visible>
      <GestureRecognizer
        onSwipe={(e) => console.log('onSwipe', e)}
        onSwipeDown={(e) => console.log('onSwipeDown', e)}
      >
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
            <KeyboardAvoidingView>
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

                {/* 일정 등록 버튼 */}
                <OrangeTouchable onPress={onAddTodoHandler}>
                  <SectionTitle>Click to Add</SectionTitle>
                </OrangeTouchable>
              </TodoInputWrapper>
            </KeyboardAvoidingView>
          </ScrollView>
        </ModalTranspBgView>
      </GestureRecognizer>
    </Modal>
  );
}

export default TodoRegistModal;
