import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import BedTimeSetScrn from '../../../screens/todosFirestore/TodosFirestoreScrn';
import { TBedTimeNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TBedTimeNavParams>();
const BedTimeStackNav = ({}: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BedTimeSetScrn" component={BedTimeSetScrn} />
    </Stack.Navigator>
  );
};

export default BedTimeStackNav;
