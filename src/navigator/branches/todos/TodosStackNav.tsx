import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import TopHeaderTitle from '../../../components/header/TopHeaderTitle';
import TodosDetailedListScrn from '../../../screens/todos/TodosDetailedListScrn';
import TodosMainScrn from '../../../screens/todos/TodosMainScrn';
import { TTodosNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TTodosNavParams>();
function TodosStackNav({}: IProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="TodosMainScrn"
        component={TodosMainScrn}
        options={{
          headerTitle: () => <TopHeaderTitle title="Calendar" />,
        }}
      />
      <Stack.Screen
        name="TodosDetailedListScrn"
        component={TodosDetailedListScrn}
      />
    </Stack.Navigator>
  );
}

export default TodosStackNav;
