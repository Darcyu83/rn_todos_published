import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TTodosNavParams } from '../../navigator/branches/todos/types';
import { TRootNavParamsList } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { TTodoList } from '../../redux/todos/types';
import TodoCard from './TodoCard';

interface IProps {
  route: NativeStackScreenProps<
    TTodosNavParams,
    'TodosDetailedListScrn'
  >['route'];
}

function TodosDetailedListScrn({ route }: IProps) {
  const { dailyTasks } = route.params;
  useEffect(() => {
    console.log('todosList[Number(id)]', dailyTasks);
  }, []);

  return (
    <View style={{}}>
      <FlatList
        data={dailyTasks}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item, index }) => <TodoCard index={index} todo={item} />}
      />
    </View>
  );
}

export default TodosDetailedListScrn;
