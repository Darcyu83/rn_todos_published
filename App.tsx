import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { useAppSelector } from './src/redux/hooks';
import { store } from './src/redux/store';
import TodosMainScrn from './src/screens/todos/TodosMainScrn';
import { theme } from './src/styles/theme';

interface IProps {}

function App({}: IProps) {
  const { isDarkMode } = store.getState().theme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? theme.darkMode : theme.lightMode}>
        <TodosMainScrn />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
