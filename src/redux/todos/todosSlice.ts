import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
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
  //     DotStyle.message,
  //     DotStyle.meeting,
  //   ],
  // },
  // '2022-10-18': { taskCnt: 0, dots: [DotStyle.message] },
  // '2022-10-19': { taskCnt: 0, dots: [DotStyle.message] },
  // '2022-10-20': {
  //   taskCnt: 0,
  //   dots: [DotStyle.vacation, DotStyle.workout, DotStyle.message],
  // },
  // '2022-10-21': {
  //   taskCnt: 0,
  //   dots: [DotStyle.vacation, DotStyle.workout, DotStyle.message],
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
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      const startDtString = action.payload.startDtData.dateString;
      const endDtString = action.payload.endDtData.dateString;
      const dateStringsArr = crateDatesStringArr(startDtString, endDtString);

      state.list[action.payload.id] = {
        info: action.payload,
        period: dateStringsArr,
      };
    },
    removeTodo: (state, action: PayloadAction<{ taskId: number }>) => {
      //   state.list = state.list.filter((todo) => todo.id !== action.payload.id);
      delete state.list[action.payload.taskId];
    },

    clearAllTodos: (state) => {
      state.list = {};
      // state.markedDates = {};
    },
  },
  //초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
