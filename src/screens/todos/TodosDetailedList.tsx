import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import TodoCard from './TodoCard';

interface IProps {}

function TodosDetailedList({}: IProps) {
  const todoList = useAppSelector((state) => state.todos.list);

  return (
    <View style={{}}>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <TodoCard index={index} todo={item} />}
      />
    </View>
  );
}

export default TodosDetailedList;
