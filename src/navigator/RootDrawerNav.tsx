import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  getDrawerStatusFromState,
  useDrawerProgress,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer/lib/typescript/src/types';
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Adaptable,
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import TopHeaderTitle from '../components/header/TopHeaderTitle';
import { useAppSelector } from '../redux/hooks';
import UserLogOutScrn from '../screens/user/auth/UserLogOutScrn';
import UserProfileScrn from '../screens/user/UserProfileScrn';
import TodosStackNav from './branches/todos/TodosStackNav';
import UserStackNav from './branches/user/UserStackNav';
import RootBtmTabNav from './RootBtmTabNav';
import { TDrawerNavParamList } from './types';

type TDrawerNavigation = DrawerNavigationProp<TDrawerNavParamList>;
type TDrawerScreenProps = DrawerScreenProps<TDrawerNavParamList>;
const Drawer = createDrawerNavigator<TDrawerNavParamList>();

function RootDrawerNav() {
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      //   defaultStatus="open"
      //  드로우 패널 아이템 커스텀
      //   drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({}) => ({
        headerTransparent: true,
        headerShown: false,

        drawerType: 'front',

        drawerStatusBarAnimation: 'fade',
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: '#c6cbef',
          //   width: dimensions.width * 0.6,
          //   height: dimensions.height,
          borderTopRightRadius: dimensions.height,
          borderBottomRightRadius: dimensions.height,
          overflow: 'hidden',
        },
        drawerContentContainerStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        drawerItemStyle: { width: '90%' },
        // drawerPosition: 'right',
      })}
    >
      <Drawer.Screen name="todoList">
        {(props) => (
          <FloatingScrn>
            <RootBtmTabNav />
          </FloatingScrn>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="myProfile">
        {(props) => (
          <FloatingScrn>
            <UserProfileScrn {...props} />
          </FloatingScrn>
        )}
      </Drawer.Screen>

      <Drawer.Screen name="signOut">
        {(props) => (
          <FloatingScrn>
            <UserLogOutScrn {...props} />
          </FloatingScrn>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default RootDrawerNav;

export function TestNavBar({ navigation }: { navigation: TDrawerNavigation }) {
  return (
    <SafeAreaView>
      <Text
        onPress={() =>
          navigation.navigate('todoList', { screen: 'TodosMainScrn' })
        }
      >
        Todo Home
      </Text>

      <Text
        onPress={() => {
          navigation.navigate('myProfile', { screen: 'UserProfileScrn' });
        }}
      >
        My Profile
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('signOut');
        }}
      >
        User sign out
      </Text>
    </SafeAreaView>
  );
}

// ========================================================================

function FloatingScrn({ children }: { children: React.ReactNode }) {
  //   const progress = useDrawerProgress() as Adaptable<number>;
  const progress = useDrawerProgress() as Animated.SharedValue<number>;
  const dimensions = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: interpolate(progress.value, [0, 1], [1, 20], {
      extrapolateLeft: Extrapolate.CLAMP,
    }),
    transform: [
      //   { scale: interpolate(progress.value, [0, 1], [1, 0.8]) },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, dimensions.width * 0.7 + 10]
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, dimensions.height * 0.1 + 10]
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        { width: '100%', height: '100%', overflow: 'hidden' },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

// ========================================================================

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { state: route, navigation, descriptors } = props;

  const {
    list: todoList,
    error,
    isProcessing,
  } = useAppSelector((state) => state.todos);

  return (
    <DrawerContentScrollView {...props}>
      <View>
        {/* <View style={[animatedStyle]}> */}
        <Text style={{ color: 'white', fontSize: 24 }}>Cutomized Menu</Text>
      </View>

      {/* {route.routeNames.map((name) => (
          <DrawerItem
            key={name}
            label={({ focused, color }) => (
              <Text style={{ color: focused ? `red` : `black` }}>
                {focused ? `${name}_focuesed` : `${name}`}
              </Text>
            )}
            icon={({ size }) => (
              <Text
                style={{
                  width: size,
                  borderColor: 'white',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                Icon
              </Text>
            )}
            onPress={() => navigation.navigate(name)}
            style={{
              borderColor: 'blue',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
        ))} */}

      <>
        {Object.keys(todoList).map((todoKey) => {
          const todo = todoList[Number(todoKey)].info;
          return (
            <Pressable key={todo.title} onPress={() => navigation.goBack()}>
              <Text>{todo.title}</Text>
              <Text>{todo.todo}</Text>
            </Pressable>
          );
        })}
      </>

      <DrawerItem label="extra Item" onPress={() => {}} labelStyle={{}} />
    </DrawerContentScrollView>
  );
}
