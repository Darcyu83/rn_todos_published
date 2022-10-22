import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import UserProfileScrn from '../../../screens/user/UserProfileScrn';
import { TTUserNavParams } from './types';

interface IProps {}

const Stack = createNativeStackNavigator<TTUserNavParams>();
const UserStackNav = ({}: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfileScrn" component={UserProfileScrn} />
    </Stack.Navigator>
  );
};

export default UserStackNav;
