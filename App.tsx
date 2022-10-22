import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import RootBtnNav from './src/navigator/RootBtnNav';
import { useAppSelector } from './src/redux/hooks';

import { persistor, store } from './src/redux/store';
import { theme } from './src/styles/theme';

interface IProps {}

function App({}: IProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootBtnNav />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
