import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { crateDatesStringArr } from '../../utils/calendarUtils';
import { TTodosInitialState, TTodo } from './types';

const initialState: TTodosInitialState = {
  list: {},
  // markedDates: {
  // '2022-10-17': {
  //   taskCnt: 0,
  //   dots: [
  //     DotStyle.vacation,
  //     DotStyle.workout,
  //     DotStyle.massage,
  //     DotStyle.meeting,
  //   ],
  // },
  // '2022-10-18': { taskCnt: 0, dots: [DotStyle.massage] },
  // '2022-10-19': { taskCnt: 0, dots: [DotStyle.massage] },
  // '2022-10-20': {
  //   taskCnt: 0,
  //   dots: [DotStyle.vacation, DotStyle.workout, DotStyle.massage],
  // },
  // '2022-10-21': {
  //   taskCnt: 0,
  //   dots: [DotStyle.vacation, DotStyle.workout, DotStyle.massage],
  // },
  // },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      const taskId = action.payload.id;
      const startDtString = action.payload.startDtData.dateString;
      const endDtString = action.payload.endDtData.dateString;
      const category = action.payload.category;

      // 할일 정보 및 기간 정보
      let todoList = state.list;
      const dateStringsArr = crateDatesStringArr(startDtString, endDtString);

      if (!todoList[taskId]) {
        todoList[taskId] = { info: action.payload, period: dateStringsArr };
      } else {
        todoList[taskId] = {
          info: { ...todoList[taskId].info, ...action.payload },
          period: dateStringsArr,
        };
      }

      state.list = todoList;
    },
    removeTodo: (state, action: PayloadAction<TTodo>) => {
      //   state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },

    clearAllTodos: (state) => {
      state.list = {};
      state.markedDates = {};
    },
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
