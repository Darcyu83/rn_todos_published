import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserToken } from '../redux/user/userSlice';
import TodosMainScrn from '../screens/todos/TodosMainScrn';
import { theme } from '../styles/theme';
import { sleep } from '../utils/etc';
import TodosStackNav from './branches/todos/TodosStackNav';
import UserAuthStackNav from './branches/user/auth/UserAuthStackNav';
import UserStackNav from './branches/user/auth/UserAuthStackNav';
import { TRootNavParamsList } from './types';

interface IProps {}

const Root = createBottomTabNavigator<TRootNavParamsList>();

const RootBtnNav = ({}: IProps) => {
  const userToken = useAppSelector((state) => state.user.info.userToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const saveUserTokenAsync = async () => {
    //   sleep(10000);
    //   dispatch(setUserToken('temporary token2'));
    // };
    // saveUserTokenAsync();
  }, []);

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {/* 로그인 여부에 따른 구분 */}
        {
          userToken ? (
            <>
              <Root.Screen name="todos" component={TodosStackNav} />
              <Root.Screen name="user" component={UserStackNav} />
            </>
          ) : (
            <Root.Screen name="auth" component={UserAuthStackNav} />
          )
          // <Root.Screen name=/>
        }

        {/* 로그인 여부에 상관없이  */}
      </Root.Navigator>
    </ThemeProvider>
  );
};

export default RootBtnNav;
