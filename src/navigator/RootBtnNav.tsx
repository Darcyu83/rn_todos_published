import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ListIcon, UserIcon } from '../components/icons/pngs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserToken } from '../redux/user/userSlice';
import TodosMainScrn from '../screens/todos/TodosMainScrn';
import { theme } from '../styles/theme';
import { sleep } from '../utils/etc';
import BedTimeStackNav from './branches/bedTime/BedTimeStackNav';
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
      <Root.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: '#70d7c7' }}
      >
        {/* 로그인 여부에 따른 구분 */}
        {
          userToken ? (
            <>
              <Root.Screen
                name="todos"
                component={TodosStackNav}
                options={{
                  title: 'ToDos',

                  tabBarIcon: () => <ListIcon />,
                }}
              />
              <Root.Screen
                name="user"
                component={UserStackNav}
                options={{ title: 'user', tabBarIcon: () => <UserIcon /> }}
              />
              <Root.Screen
                name="bedtime"
                component={BedTimeStackNav}
                options={{ title: 'Bed Time', tabBarIcon: () => <UserIcon /> }}
              />
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
