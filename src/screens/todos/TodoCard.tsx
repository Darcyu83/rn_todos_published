import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo } from '../../redux/todos/types';
import {
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';

const ContainerTouchable = styled.TouchableOpacity`
  /* background-color: rgba(30, 144, 255, 0.5); */
  width: 100%;
  min-width: 100%;
  background-color: red;
  margin: 5px 0px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface IProps {
  todo: TTodo;
  index: number;
  onPressTodoCardToModify: (taskInfo: TTodo) => void;
}

function TodoCard({ todo, index, onPressTodoCardToModify }: IProps) {
  const dispatch = useAppDispatch();
  const onRemoveTodohandler = () => {
    dispatch(todosActions.removeTodo(todo));
  };

  const [titleTxt, setTitleTxt] = useState(todo.title);

  return (
    <ContainerTouchable onPress={onPressTodoCardToModify}>
      <RowContainer>
        {/*ROW1 :  타이틀 */}
        <Text>{`[${
          todo.category.charAt(0).toUpperCase() + todo.category.slice(1)
        }] ${titleTxt}`}</Text>
      </RowContainer>

      {/*ROW2 :   내용 */}
      <RowContainer>
        <Text>{todo.todo}</Text>
      </RowContainer>

      {/* 삭제 버튼 */}
      <OrangeTouchable onPress={onRemoveTodohandler}>
        <Text>DEL</Text>
      </OrangeTouchable>
    </ContainerTouchable>
  );
}

export default TodoCard;
