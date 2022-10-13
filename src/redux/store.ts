import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './theme/themeSlice';
import { todosReducer } from './todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
