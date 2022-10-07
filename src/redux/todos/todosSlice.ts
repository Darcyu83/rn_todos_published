import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTodosInitialState, TTodo } from './types';

const initialState: TTodosInitialState = {
	todos: [],
};

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<TTodo>) => {
			state.todos = state.todos.concat(action.payload);
		},
		removeTodo: (state, action: PayloadAction<TTodo>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
