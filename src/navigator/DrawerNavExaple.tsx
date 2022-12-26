import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenStackProps } from 'react-native-screens';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});

function TabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabOne"
        component={() => (
          <View style={styles.container}>
            <Text>TabOne</Text>
          </View>
        )}
      />
      <Tab.Screen
        name="TabTwo"
        component={() => (
          <View style={styles.container}>
            <Text>TabTwo</Text>
          </View>
        )}
      />
    </Tab.Navigator>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const width = useWindowDimensions().width * 0.3;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <View
          style={[
            styles.menuItemsCard,
            { backgroundColor: '#fff2df', width, height: width },
          ]}
        >
          <View
            style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}
          >
            {/* <Feather travel name="briefcase" size={25} color="#fbae41" /> */}
            <DrawerItem
              label="Screen1"
              labelStyle={{ color: '#fbae41', fontSize: 10 }}
              onPress={() => {
                // eslint-disable-next-line react/destructuring-assignment
                props.navigation.navigate('Screen1');
              }}
            />
          </View>

          <DrawerItem
            style={{
              position: 'absolute',
              left: 0,
              width,
              height: width,
            }}
            label="Screen2"
            labelStyle={{ color: '#609806' }}
            onPress={() => {
              // eslint-disable-next-line react/destructuring-assignment
              props.navigation.navigate('Screen1');
            }}
          />
        </View>
        <View
          style={[
            styles.menuItemsCard,
            { backgroundColor: '#EFFFD5', width, height: width },
          ]}
        >
          <View
            style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}
          >
            {/* <Feather Medical name="briefcase" size={25} color="#609806" /> */}
          </View>

          <DrawerItem
            style={{
              position: 'absolute',
              left: 0,
              width,
              height: width,
            }}
            label="Screen2"
            labelStyle={{ color: '#609806' }}
            onPress={() => {
              // eslint-disable-next-line react/destructuring-assignment
              props.navigation.navigate('StackNav');
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Screen1" component={StackNav} />
      <Drawer.Screen name="StackNav" component={TabNav} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }

function Feed({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Article" onPress={() => navigation.navigate('Article')} />
    </View>
  );
}

function Article({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
      <Button title="Feed" onPress={() => navigation.navigate('Feed')} />
    </View>
  );
}

function createStackNavigator() {
  throw new Error('Function not implemented.');
}
