import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { TTodosNavParams } from '../../navigator/branches/todos/types';

import { TTodo, TTodoList } from '../../redux/todos/types';
import {
  OrangeTouchable,
  SafeAreaCustomized,
} from '../../styles/styledComponents/components';
import TodoCard from './TodoCard';
import TodoRegistModal from './TodoRegistModal';

const BtnWrapper = styled.View`
  width: 100%;
  padding: 2px 5px;
`;

interface IProps {
  route: NativeStackScreenProps<
    TTodosNavParams,
    'TodosDetailedListScrn'
  >['route'];
}

function TodosDetailedListScrn({ route }: IProps) {
  const { dailyTasks } = route.params;

  // 할일 등록 모달 토글
  const [isRegModalShown, setIsRegModalShown] = useState(false);

  const [taskModified, setTaskModified] = useState<TTodo | null>(null);

  const onPressTodoCardToModify = (taskInfo: TTodo) => {
    setTaskModified(taskInfo);
    setIsRegModalShown(true);
  };

  const scrollY = new Animated.Value(0);
  const flatlistRef = useRef<FlatList>(null);
  useEffect(() => {
    console.log('todosList[Number(id)]', dailyTasks);
    console.log('flatlistRef', flatlistRef.current);
  }, []);
  return (
    <SafeAreaCustomized>
      <FlatList
        ref={flatlistRef}
        data={dailyTasks}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item, index }) => (
          <TodoCard
            index={index}
            scrollY={scrollY}
            todo={item}
            onPressTodoCardToModify={() => onPressTodoCardToModify(item)}
          />
        )}
        onScroll={(e) =>
          console.log(
            'onScroll e.nativeEvent.contentOffset === ',
            e.nativeEvent
          )
        }
        onLayout={(e) => {
          console.log('onLayout === ', e.nativeEvent.layout);
        }}
        style={{
          flex: 1,
          padding: 10,
        }}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
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
    </SafeAreaCustomized>
  );
}

export default TodosDetailedListScrn;
