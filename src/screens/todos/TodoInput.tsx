import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import {
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';

const Container = styled.View`
  border: 1px solid black;
`;

interface IProps {}

function TodoInput({}: IProps) {
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
    <Container>
      {/* 할일 타이틀 */}
      <SectionTitle>Todo Title</SectionTitle>
      <TextInput value={todoTitle} onChangeText={(txt) => setTodoTitle(txt)} />

      {/* 할일 내용 */}
      <SectionTitle>What to do</SectionTitle>
      <TextInput value={todoContent} onChangeText={setTodoContent} />

      {/* 일정 달력 */}

      {/* 일정 등록 버튼 */}
      <OrangeTouchable onPress={onAddTodoHandler}>
        <SectionTitle>Click to Add</SectionTitle>
      </OrangeTouchable>
    </Container>
  );
}

export default TodoInput;
