import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { ListIcon, UserIcon } from '../components/icons/pngs';
import { useAppSelector } from '../redux/hooks';
import { TTodo, TTodoList } from '../redux/todos/types';
import { theme } from '../styles/theme';
import {
  crateDatesStringArr,
  createPeriodMarkedDates,
} from '../utils/calendarUtils';
import {
  createTodoListItemForRedux,
  deleteTodoInFirestore,
  getTodoListFromFirestore,
} from '../utils/firestore';
import BedTimeStackNav from './branches/bedTime/BedTimeStackNav';
import TodosStackNav from './branches/todos/TodosStackNav';
import UserStackNav from './branches/user/UserStackNav';
import { TRootNavParamsList } from './types';

interface IProps {}

const Tab = createBottomTabNavigator<TRootNavParamsList>();

function RootBtmTabNav({}: IProps) {
  const userToken = useAppSelector((state) => state.user.info.userToken);
  const { list: todoList } = useAppSelector((state) => state.todos);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    (async () => {
      try {
        const remoteDB = await getTodoListFromFirestore();

        // 파이어 스토어 저장 개수 === 리덕스 저장 개수
        if (remoteDB.size === Object.keys(todoList).length) return;

        remoteDB.forEach((doc) => {
          const docId = Number(doc.id);
          if (!todoList[docId]) {
            deleteTodoInFirestore(doc.id);
          }
        });
      } catch (error) {
        console.log('useEffect==getTodoListFromFirestore', error);
      }
    })();
  }, [todoList]);

  return (
    <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
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
                title: 'Calendar',

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
                title: 'Firestore',
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
            name="auth"
            component={UserStackNav}
            // tab bar invisible
            options={{ tabBarStyle: { display: 'none' } }}
          />
        )}
      </Tab.Navigator>
    </ThemeProvider>
  );
}

export default RootBtmTabNav;
