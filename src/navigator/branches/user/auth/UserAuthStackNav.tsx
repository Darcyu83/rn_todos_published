import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import UserLogOutScrn from '../../../../screens/user/auth/UserLogOutScrn';
import UserResetPwScrn from '../../../../screens/user/auth/UserResetPwScrn';
import UserSignInScrn from '../../../../screens/user/auth/UserSignInScrn';
import UserSignUpScrn from '../../../../screens/user/auth/UserSignUpScrn';
import { TRootNavParamsList } from '../../../types';
import { TUserAuthNavParams } from './types';

interface IProps {
  navigation: BottomTabNavigationProp<TRootNavParamsList>;
}
const Stack = createNativeStackNavigator<TUserAuthNavParams>();

const UserAuthStackNav = ({ navigation }: IProps) => {
  const userToken = useAppSelector((state) => state.user.info.userToken);

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);

  useEffect(() => {});
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen
          name="UserLogOutScrn"
          component={UserLogOutScrn}
          options={{ headerShown: true }}
        />
      ) : (
        <>
          <Stack.Screen name="UserSignInScrn" component={UserSignInScrn} />
          <Stack.Screen name="UserSignUpScrn" component={UserSignUpScrn} />
          <Stack.Screen name="UserResetPwScrn" component={UserResetPwScrn} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default UserAuthStackNav;
