import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useAppSelector } from '../../../../redux/hooks';
import UserLogOutScrn from '../../../../screens/user/auth/UserLogOutScrn';
import UserSignInScrn from '../../../../screens/user/auth/UserSignInScrn';
import UserSignUpScrn from '../../../../screens/user/auth/UserSignUpScrn';
import { TUserAuthNavParams } from './types';

interface IProps {}
const Stack = createNativeStackNavigator<TUserAuthNavParams>();

const UserAuthStackNav = ({}: IProps) => {
  const userToken = useAppSelector((state) => state.user.info.userToken);
  return (
    <Stack.Navigator>
      {userToken ? (
        <Stack.Screen name="UserLogOutScrn" component={UserLogOutScrn} />
      ) : (
        <>
          <Stack.Screen name="UserSignInScrn" component={UserSignInScrn} />
          <Stack.Screen name="UserSignUpScrn" component={UserSignUpScrn} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default UserAuthStackNav;
