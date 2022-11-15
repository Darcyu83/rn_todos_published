import { all } from 'redux-saga/effects';
import todosSaga from './todos/todosSaga';

export default function* rootSaga() {
  yield all([todosSaga()]);
}
