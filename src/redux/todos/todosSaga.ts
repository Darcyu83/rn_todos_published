import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import {
  addTodoInFirestore,
  deleteTodoInFirestore,
  updateTodoInFirestore,
} from '../../utils/firestore';
import { todosActions } from './todosSlice';
import { TTodo } from './types';

function* addTodoSaga(action: PayloadAction<TTodo>) {
  console.log('%c addTodoSaga ==== ', 'background-color: blue; color: white');

  try {
    yield put(todosActions.addTodoSuccess(action.payload));
    yield call(addTodoInFirestore, action.payload);
  } catch (error) {
    let errMsg = 'addTodoSaga Failure';
    if (error instanceof Error) errMsg = error.message;
    yield put(todosActions.addTodoFailure({ errMsg }));
  }
}

function* deleteTodoSaga(action: PayloadAction<{ taskId: number }>) {
  console.log(
    '%c deleteTodoSaga ==== ',
    'background-color: crimson; color: white'
  );
  try {
    yield put(todosActions.deleteTodoSuccess(action.payload));
    yield call(deleteTodoInFirestore, String(action.payload.taskId));
  } catch (error) {
    let errMsg = 'deleteTodoSaga Failure';
    if (error instanceof Error) errMsg = error.message;
    yield put(todosActions.deleteTodoFailure({ errMsg }));
  }
}

function* upateTodoSaga(action: PayloadAction<TTodo>) {
  console.log('%c upateTodoSaga ==== ', 'background-color: dodgerblue');
  try {
    yield put(todosActions.updateTodoSuccess(action.payload));
    yield call(updateTodoInFirestore, action.payload);
  } catch (error) {
    let errMsg = 'upateTodoSaga Failure';
    if (error instanceof Error) errMsg = error.message;
    yield put(todosActions.deleteTodoFailure({ errMsg }));
  }
}

function* watchAddTodo() {
  yield takeLatest(todosActions.addTodo, addTodoSaga);
}
function* watchDeleteTodo() {
  yield takeLatest(todosActions.deleteTodo, deleteTodoSaga);
}

function* watchUpdateTodo() {
  yield takeLatest(todosActions.updateTodo, upateTodoSaga);
}

export default function* todosSaga() {
  yield all([watchAddTodo(), watchUpdateTodo(), watchDeleteTodo()]);
}
