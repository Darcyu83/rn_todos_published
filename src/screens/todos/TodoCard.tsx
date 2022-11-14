import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { EditIcon, TrashBinIcon } from '../../components/icons/pngs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo } from '../../redux/todos/types';
import { CustomStyle } from '../../styles/shadowStyle';

const Container = styled.View`
  /* background-color: rgba(30, 144, 255, 0.5); */
  width: 100%;
  min-width: 100%;
  margin: 5px 0px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const BtnWrapper = styled.View<{ right: number }>`
  width: ${20}px;
  height: ${20}px;
  z-index: 99;
  position: absolute;
  top: 50%;
  right: ${(props) => props.right}px;
`;

interface IProps {
  todo: TTodo;

  index: number;
  onPressToModify: () => void;
}

function TodoCard({ todo, index, onPressToModify }: IProps) {
  const { userId } = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();

  const onRemoveTodohandler = async () => {
    if (!userId) return;

    console.log(
      '%c Remove todo ==== ',
      'background-color: tomato',
      userId,
      todo.id
    );

    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('todoList')
        .doc(`${todo.id}`)
        .delete()
        .then(() => {
          console.log(
            '%c Remove todo ==== Done',
            'background-color: lightgreen'
          );
        });
    } catch (error) {
      console.log(
        '%c Remove todo ==== error:: ',
        'background-color: tomato',
        error
      );
    }

    // dispatch(todosActions.removeTodo({ taskId: todo.id }));
  };

  const rotateAni = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(rotateAni.current, {
      toValue: 1,
      duration: 200 + index * 100,
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          minWidth: '100%',
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: 'transparent',
          borderStyle: 'solid',
        },
        CustomStyle.shadow,
        {
          transform: [
            { scale: rotateAni.current },
            {
              rotate: rotateAni.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['35deg', '0deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Container>
        <RowContainer>
          {/* ROW1 :  타이틀 */}
          <Text>{`[${
            todo.category.charAt(0).toUpperCase() + todo.category.slice(1)
          }] ${todo.title}`}</Text>
        </RowContainer>

        {/* ROW2 :   내용 */}
        <RowContainer>
          <Text>{todo.todo}</Text>
        </RowContainer>
      </Container>

      {/* 수정 버튼 */}
      <BtnWrapper right={30}>
        <TouchableOpacity onPress={onPressToModify}>
          <EditIcon />
        </TouchableOpacity>
      </BtnWrapper>

      {/* 삭제 버튼 */}
      <BtnWrapper right={5}>
        <TouchableOpacity
          onPress={async () => {
            await onRemoveTodohandler();
          }}
        >
          <TrashBinIcon width="100%" height="100%" />
        </TouchableOpacity>
      </BtnWrapper>
    </Animated.View>
  );
}

export default TodoCard;
