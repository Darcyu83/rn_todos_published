import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import CalendarDatePicker from '../../components/calendar/CalendarDatePicker';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import {
  ModalTranspBgView,
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';

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
  const dispatch = useAppDispatch();

  const onAddTodoHandler = () => {
    if (!todoTitle) return;
    dispatch(
      todosActions.addTodo({
        category: 'vacation',
        isInSingleDay: true,
        id: new Date().getTime(),
        title: todoTitle,
        todo: todoContent,
        startDt: '',
        endDt: '',
      })
    );
    setTodoTitle('');
    setTodoContent('');
  };
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
          <CalendarWrapper>
            <CalendarDatePicker />
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
              {/* 일정 등록 버튼 */}
              <OrangeTouchable onPress={onAddTodoHandler}>
                <SectionTitle>Click to Add</SectionTitle>
              </OrangeTouchable>
            </TodoInputWrapper>
          </KeyboardAvoidingView>
        </ScrollView>
      </ModalTranspBgView>
    </Modal>
  );
}

export default TodoRegistModal;
