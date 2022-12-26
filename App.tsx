import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import AuthProvider from './src/context/auth/AuthProvider';
import RootBtmTabNav from './src/navigator/RootBtmTabNav';
import { useAppSelector } from './src/redux/hooks';

import { persistor, store } from './src/redux/store';
import { theme } from './src/styles/theme';
import RootDrawerNav from './src/navigator/RootDrawerNav';
import MyDrawer from './src/navigator/DrawerNavExaple';

interface IProps {}

function App({}: IProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <NavigationContainer>
              {/* <RootBtmTabNav /> */}

              <RootDrawerNav />
              {/* <MyDrawer /> */}
            </NavigationContainer>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
