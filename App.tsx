import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import AuthProvider from './src/context/auth/AuthProvider';
import RootBtnNav from './src/navigator/RootBtnNav';
import { useAppSelector } from './src/redux/hooks';

import { persistor, store } from './src/redux/store';
import { theme } from './src/styles/theme';

interface IProps {}

function App({}: IProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <NavigationContainer>
              <RootBtnNav />
            </NavigationContainer>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
