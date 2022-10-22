import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { crateDatesStringArr } from '../../utils/calendarUtils';
import { TTodosInitialState, TTodo } from './types';

const initialState: TTodosInitialState = {
  list: {},
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      const taskId = action.payload.id;
      const startDtString = action.payload.startDtData.dateString;
      const endDtString = action.payload.endDtData.dateString;
      let newList = state.list;

      const dateStringsArr = crateDatesStringArr(startDtString, endDtString);

      // 할일 기간 정보

      if (!newList[taskId]) {
        newList[taskId] = { info: action.payload, period: dateStringsArr };
      } else {
        newList[taskId] = {
          info: { ...newList[taskId].info, ...action.payload },
          period: dateStringsArr,
        };
      }

      state.list = newList;
    },
    removeTodo: (state, action: PayloadAction<TTodo>) => {
      //   state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },

    clearAllTodos: (state) => {
      state.list = {};
    },
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
