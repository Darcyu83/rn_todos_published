import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import TodosDetailedListScrn from '../../../screens/todos/TodosDetailedListScrn';
import TodosMainScrn from '../../../screens/todos/TodosMainScrn';
import { TTodosNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TTodosNavParams>();
const TodosStackNav = ({}: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodosMainScrn" component={TodosMainScrn} />
      <Stack.Screen
        name="TodosDetailedListScrn"
        component={TodosDetailedListScrn}
      />
    </Stack.Navigator>
  );
};

export default TodosStackNav;
