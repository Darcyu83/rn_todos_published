import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { ListIcon, UserIcon } from '../components/icons/pngs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import TodosFirestoreScrn from '../screens/todosFirestore/TodosFirestoreScrn';
import { theme } from '../styles/theme';
import BedTimeStackNav from './branches/bedTime/BedTimeStackNav';
import TodosStackNav from './branches/todos/TodosStackNav';
import UserStackNav from './branches/user/UserStackNav';
import { TRootNavParamsList } from './types';

interface IProps {}

const Tab = createBottomTabNavigator<TRootNavParamsList>();

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
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#70d7c7',
          tabBarShowLabel: true,
        }}
      >
        {/* 로그인 여부에 따른 구분 */}
        {userToken ? (
          <>
            <Tab.Screen
              name="todos"
              component={TodosStackNav}
              options={{
                title: 'ToDos',
                tabBarIcon: ({ color, size, focused }) => (
                  <ListIcon
                    color={color}
                    size={size}
                    focused={focused}
                    isBtmLineShown
                  />
                ),
              }}
            />
            <Tab.Screen
              name="todosFiresstore"
              component={TodosFirestoreScrn}
              options={{
                title: 'todosFiresstore',

                tabBarIcon: ({ color, size, focused }) => (
                  <ListIcon
                    color={color}
                    size={size}
                    focused={focused}
                    isBtmLineShown
                  />
                ),
              }}
            />

            <Tab.Screen
              name="user"
              component={UserStackNav}
              options={{
                // tab bar visible
                tabBarStyle: { display: 'flex' },
                title: 'user',
                tabBarIcon: ({ color, size, focused }) => (
                  <UserIcon
                    color={color}
                    size={size}
                    focused={focused}
                    isBtmLineShown
                  />
                ),
              }}
            />
            <Tab.Screen
              name="bedtime"
              component={BedTimeStackNav}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <ListIcon
                    color={color}
                    size={size}
                    focused={focused}
                    isBtmLineShown
                  />
                ),
              }}
            />
          </>
        ) : (
          <Tab.Screen
            name="user"
            component={UserStackNav}
            // tab bar invisible
            options={{ tabBarStyle: { display: 'none' } }}
          />
        )}
      </Tab.Navigator>
    </ThemeProvider>
  );
};

export default RootBtnNav;
