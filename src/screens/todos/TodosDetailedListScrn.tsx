import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { TRootNavParamsList } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { TTodo, TTodoList } from '../../redux/todos/types';
import {
  OrangeTouchable,
  SafeAreaCustomized,
} from '../../styles/styledComponents/components';
import TodoCard from './TodoCard';
import TodoRegistModal from './TodoRegistModal';

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

  useEffect(() => {
    console.log('todosList[Number(id)]', dailyTasks);
  }, []);

  return (
    <SafeAreaCustomized>
      <FlatList
        data={dailyTasks}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item, index }) => (
          <TodoCard
            index={index}
            todo={item}
            onPressTodoCardToModify={() => onPressTodoCardToModify(item)}
          />
        )}
        style={{
          width: '100%',
          padding: 10,
          borderWidth: 2,
          borderColor: 'blue',
          borderStyle: 'dotted',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      {/* 등록 버튼 */}
      <KeyboardAvoidingView>
        <OrangeTouchable
          onPress={() => {
            setIsRegModalShown(true);
          }}
        >
          <Text>Regist new Todos</Text>
        </OrangeTouchable>
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
