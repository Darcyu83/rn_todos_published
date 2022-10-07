import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTodosInitialState, TTodo } from './types';

const initialState: TTodosInitialState = {
	list: [],
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<TTodo>) => {
			state.list = state.list.concat(action.payload);
		},
		removeTodo: (state, action: PayloadAction<TTodo>) => {
			state.list = state.list.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
