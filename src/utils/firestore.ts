import firestore from '@react-native-firebase/firestore';
import { store } from '../redux/store';
import { todosActions } from '../redux/todos/todosSlice';
import { TTodo, TTodoList } from '../redux/todos/types';
import { crateDatesStringArr } from './calendarUtils';

/**
 *  파이어스토어 사용자 TodoList 업데이트 이벤트 리스너
 *  업데이트 될 경우 리덕스에 자동 저장
 *
 * @return unsubscriber function
 *  */
export const addFirestoreListenerOnTodoList = () => {
  const { userId } = store.getState().user.info;

  if (!userId) return null;

  const subscriber = firestore()
    .collection('users')
    .doc(userId)
    .collection('todoList')
    .onSnapshot((querySnapshot) => {
      let todoListObj: TTodoList = {};
      querySnapshot.forEach((documentSnapshot) => {
        console.log(
          '%c users/userEmail/todoList collection documentSnapshot',
          'background-color: red',
          documentSnapshot.data()
        );

        const info: TTodo = documentSnapshot.data() as TTodo;
        const period = crateDatesStringArr(
          info.startDtData.dateString,
          info.endDtData.dateString
        );

        todoListObj = {
          ...todoListObj,
          [Number(documentSnapshot.id)]: {
            info,
            period,
          },
        };
      });

      store.dispatch(todosActions.addTodoList(todoListObj));
    });

  return subscriber;
};

export default { addFirestoreListenerOnTodoList };
