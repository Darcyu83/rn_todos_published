import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import TopHeaderTitle from '../../../components/header/TopHeaderTitle';
import { useAppSelector } from '../../../redux/hooks';
import UserLogOutScrn from '../../../screens/user/auth/UserLogOutScrn';
import UserProfileScrn from '../../../screens/user/UserProfileScrn';
import renderUserAuthStackGrp from './auth/renderUserAuthStackGrp';
import { TUserNavParams } from './types';

interface IProps {}

export const UserStack = createNativeStackNavigator<TUserNavParams>();

function UserStackNav({}: IProps) {
  const userToken = useAppSelector((state) => state.user.info.userToken);
  return (
    <UserStack.Navigator screenOptions={{ headerTransparent: true }}>
      {userToken ? (
        <>
          <UserStack.Screen
            name="UserProfileScrn"
            component={UserProfileScrn}
            options={{
              headerTitle: () => <TopHeaderTitle title="My Profile" />,
            }}
          />
          <UserStack.Screen
            name="UserLogOutScrn"
            component={UserLogOutScrn}
            options={(route) => ({ headerShown: true })}
          />
        </>
      ) : (
        <UserStack.Group screenOptions={{ headerShown: false }}>
          {/* Auth 관련 */}
          {renderUserAuthStackGrp()}
        </UserStack.Group>
      )}
    </UserStack.Navigator>
  );
}
export default UserStackNav;
