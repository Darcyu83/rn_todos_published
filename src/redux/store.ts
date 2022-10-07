import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from './todos/todosSlice';

export const store = configureStore({
	reducer: {
		todos: todosReducer,
	},
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
