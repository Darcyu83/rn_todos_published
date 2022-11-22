import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TopHeaderTitle from '../../../components/header/TopHeaderTitle';
import TodosDetailedListScrn from '../../../screens/todos/TodosDetailedListScrn';
import TodosMainScrn from '../../../screens/todos/TodosMainScrn';
import { TTodosNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TTodosNavParams>();
function TodosStackNav({}: IProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="TodosMainScrn"
        component={TodosMainScrn}
        options={{
          headerTitle: (props) => <TopHeaderTitle title="Calendar" />,
        }}
      />
      <Stack.Screen
        name="TodosDetailedListScrn"
        component={TodosDetailedListScrn}
        options={({ route, navigation }) => ({
          headerTintColor: '#ffffff',
          headerTitle: () => (
            <Text
              style={{
                alignSelf: 'flex-start',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {route.params.clickedDateData.dateString.split('-').join('/')}
            </Text>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default TodosStackNav;
