import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { crateDatesStringArr } from '../../utils/calendarUtils';
import { TTodosInitialState, TTodo, TTodoList } from './types';

const initialState: TTodosInitialState = {
  list: {},
  isProcessing: 'ready',
  error: null,
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
      state.isProcessing = 'processing';
    },
    addTodoSuccess: (state, action: PayloadAction<TTodo>) => {
      const taskId = action.payload.id;
      const startDtString = action.payload.startDtData.dateString;
      const endDtString = action.payload.endDtData.dateString;
      const { category } = action.payload;

      // 할일 정보 및 기간 정보
      const todoList = state.list;
      const dateStringsArr = crateDatesStringArr(startDtString, endDtString);

      if (!todoList[taskId]) {
        todoList[taskId] = { info: action.payload, period: dateStringsArr };
      } else {
        todoList[taskId] = {
          info: { ...todoList[taskId].info, ...action.payload },
          period: dateStringsArr,
        };
      }
      state.isProcessing = 'done';
      state.list = todoList;
    },
    addTodoFailure: (state, action: PayloadAction<{ errMsg: string }>) => {
      state.error = action.payload.errMsg;
      state.isProcessing = 'done';
    },
    addTodoList: (state, action: PayloadAction<TTodoList>) => {
      state.list = action.payload;
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      state.isProcessing = 'processing';
    },
    updateTodoSuccess: (state, action: PayloadAction<TTodo>) => {
      const startDtString = action.payload.startDtData.dateString;
      const endDtString = action.payload.endDtData.dateString;
      const dateStringsArr = crateDatesStringArr(startDtString, endDtString);

      state.list[action.payload.id] = {
        info: action.payload,
        period: dateStringsArr,
      };

      state.isProcessing = 'done';
    },
    updateTodoFailure: (state, action: PayloadAction<{ errMsg: string }>) => {
      state.error = action.payload.errMsg;
      state.isProcessing = 'done';
    },
    deleteTodo: (state, action: PayloadAction<{ taskId: number }>) => {
      state.isProcessing = 'processing';
    },
    deleteTodoSuccess: (state, action: PayloadAction<{ taskId: number }>) => {
      //   state.list = state.list.filter((todo) => todo.id !== action.payload.id);

      const _stateList = state.list;
      delete _stateList[action.payload.taskId];
      state.list = _stateList;
      state.isProcessing = 'done';
    },
    deleteTodoFailure: (state, action: PayloadAction<{ errMsg: string }>) => {
      state.error = action.payload.errMsg;
      state.isProcessing = 'done';
    },

    clearAllTodos: (state) => {
      state.list = {};
      // state.markedDates = {};
    },
  },
  // 초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
