import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import TopHeaderTitle from '../../../components/header/TopHeaderTitle';
import TodosFirestoreScrn from '../../../screens/todosFirestore/TodosFirestoreScrn';
import { TBedTimeNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TBedTimeNavParams>();
function BedTimeStackNav({}: IProps) {
  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true }}>
      <Stack.Screen
        name="BedTimeSetScrn"
        component={TodosFirestoreScrn}
        options={{
          headerTitle: () => <TopHeaderTitle title="Firebase Data" />,
        }}
      />
    </Stack.Navigator>
  );
}

export default BedTimeStackNav;
