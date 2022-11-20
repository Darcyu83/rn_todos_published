import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text } from 'react-native';
import styled from 'styled-components/native';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { useAppSelector } from '../../redux/hooks';
import { TTodo } from '../../redux/todos/types';
import { OrangeTouchable } from '../../styles/styledComponents/components';
import TodoCard from './TodoCardSwipeableRow';
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

  const { list: todosList } = useAppSelector((state) => state.todos);
  const [isRegOrUpdatedDone, setIsRegOrUpdatedDone] = useState(false);

  // 할일 등록 모달 토글
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  // 해당 날짜의 할일's
  const [dailyTaskList, setdailyTaskList] = useState<TTodo[] | null>(null);

  // 수정할 할일 정보
  const [taskModified, setTaskModified] = useState<TTodo | null>(null);

  const onPressToModify = (taskInfo: TTodo) => {
    setTaskModified(taskInfo);
    setIsRegModalShown(true);
  };

  const moveToMainScrn = useCallback(() => {
    navigation.navigate('TodosMainScrn');
  }, [navigation]);

  useEffect(() => {
    // 새 일정 등록 또는 수정 후 메인 화면으로
    if (isRegOrUpdatedDone) moveToMainScrn();
  }, [isRegOrUpdatedDone, moveToMainScrn]);

  useEffect(() => {}, [clickedDateData, todosList]);

  const flatlistRef = useRef<FlatList>(null);

  return (
    <SafeLinearAreaHOC>
      <FlatList
        ref={flatlistRef}
        data={createDailyDetailedTaskList(todosList, clickedDateData)}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item, index }) => (
          <TodoCard
            index={index}
            todo={item}
            onPressToModify={() => onPressToModify(item)}
          />
        )}
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
        taskModified={taskModified}
      />
    </SafeLinearAreaHOC>
  );
}

export default TodosDetailedListScrn;
