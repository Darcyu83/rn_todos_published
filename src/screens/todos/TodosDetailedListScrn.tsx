import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text } from 'react-native';
import styled from 'styled-components/native';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo, TTodoList } from '../../redux/todos/types';
import { OrangeTouchable } from '../../styles/styledComponents/components';
import TodoCardSwipeableRow from './TodoCardSwipeableRow';
import TodoRegistModal from './TodoRegistModal';
import { createDailyDetailedTaskList } from './todosUtils';

const BtnWrapper = styled.View`
  width: 100%;
  padding: 2px 5px;
`;

interface IProps {}

function TodosDetailedListScrn({
  route,
  navigation,
}: NativeStackScreenProps<TTodosNavParams, 'TodosDetailedListScrn'>) {
  const { clickedDateData } = route.params;
  const { userId } = useAppSelector((state) => state.user.info);
  const dispatch = useAppDispatch();

  const { list: todoList } = useAppSelector((state) => state.todos);

  const [_todoList, set_TodoList] = useState<TTodo[] | null>(null);
  const [isRegOrUpdatedDone, setIsRegOrUpdatedDone] = useState(false);

  // 할일 등록 모달 토글
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  // 해당 날짜의 할일's
  const [dailyTaskList, setdailyTaskList] = useState<TTodo[] | null>(null);

  // 수정할 할일 정보
  const [taskIdBeModified, setTaskIdModified] = useState<number | null>(null);
  // 삭제할 할일 정보
  const [taskIdBeDeleted, setTaskIdBeDeleted] = useState<number | null>(null);

  // 힐일 수정
  const onPressToModify = (taskId: number) => {
    setTaskIdModified(taskId);
    setIsRegModalShown(true);
  };

  // 할일 삭제
  const onSwipeToDel = useCallback(
    (todoId: number) => {
      if (!userId) return;

      console.log('onSwipeToDel ran::');
      try {
        dispatch(todosActions.deleteTodo({ taskId: todoId }));
      } catch (error) {
        console.log(
          '%c Remove todo ==== error:: ',
          'background-color: tomato',
          error
        );
      }
    },
    [dispatch, userId]
  );

  const moveToMainScrn = useCallback(() => {
    navigation.navigate('TodosMainScrn');
  }, [navigation]);

  useEffect(() => {
    // 새 일정 등록 또는 수정 후 메인 화면으로
    if (isRegOrUpdatedDone) moveToMainScrn();
  }, [isRegOrUpdatedDone, moveToMainScrn]);

  useEffect(() => {
    set_TodoList(createDailyDetailedTaskList(todoList, clickedDateData));
  }, [clickedDateData, todoList]);

  const flatlistRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!taskIdBeDeleted) return;
    set_TodoList((curr) => {
      if (!curr) return [] as TTodo[];
      const newArr = curr.filter((todo) => todo.id !== taskIdBeDeleted);
      return newArr;
    });
    onSwipeToDel(taskIdBeDeleted);

    setTaskIdBeDeleted(null);
  }, [onSwipeToDel, taskIdBeDeleted]);

  return (
    <SafeLinearAreaHOC>
      <FlatList
        ref={flatlistRef}
        data={_todoList || []}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item, index }) => {
          console.log('renderItem ::: ', item);

          return (
            <TodoCardSwipeableRow
              index={index}
              todo={item}
              onSwipeToDel={() => {
                setTaskIdBeDeleted(item.id);
              }}
              onPressToModify={() => onPressToModify(item)}
            />
          );
        }}
        style={{
          flex: 1,
          padding: 10,
        }}
        contentContainerStyle={
          {
            // justifyContent: 'flex-start',
            // alignItems: 'center',
          }
        }
      />

      {/* 등록 버튼 */}
      <KeyboardAvoidingView>
        <BtnWrapper>
          <OrangeTouchable
            onPress={() => {
              setIsRegModalShown(true);
            }}
          >
            <Text>Regist new Todos</Text>
          </OrangeTouchable>
        </BtnWrapper>
      </KeyboardAvoidingView>

      {/* 일정 등록 모달 */}
      <TodoRegistModal
        visible={isRegModalShown}
        closeModal={() => setIsRegModalShown(false)}
        taskIdBeModified={taskIdBeModified}
      />
    </SafeLinearAreaHOC>
  );
}

export default TodosDetailedListScrn;
