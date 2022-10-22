import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import UserSignInScrn from '../../../../screens/user/auth/UserSignInScrn';
import UserSignUpScrn from '../../../../screens/user/auth/UserSignUpScrn';
import { TUserAuthNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TUserAuthNavParams>();

const UserAuthStackNav = ({}: IProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserSignInScrn" component={UserSignInScrn} />
      <Stack.Screen name="UserSignUpScrn" component={UserSignUpScrn} />
    </Stack.Navigator>
  );
};

export default UserAuthStackNav;
