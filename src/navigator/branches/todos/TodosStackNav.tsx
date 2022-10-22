import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import TodosDetailedList from '../../../screens/todos/TodosDetailedList';
import TodosMainScrn from '../../../screens/todos/TodosMainScrn';
import { TTodosNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TTodosNavParams>();
const TodosStackNav = ({}: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodosMainScrn" component={TodosMainScrn} />
      <Stack.Screen name="TodosDetailedList" component={TodosDetailedList} />
    </Stack.Navigator>
  );
};

export default TodosStackNav;
