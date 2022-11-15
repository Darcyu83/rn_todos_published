import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { store } from '../redux/store';
import { todosActions } from '../redux/todos/todosSlice';
import { TTodo, TTodoList } from '../redux/todos/types';
import { crateDatesStringArr } from './calendarUtils';

const PATH_USERS = 'users';
const PATH_TODOLIST = 'todoList';

export const createTodoListItemForRedux = (
  documentSnapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  let todoListItem: TTodoList = {};
  const info: TTodo = documentSnapshot.data() as TTodo;
  const period = crateDatesStringArr(
    info.startDtData.dateString,
    info.endDtData.dateString
  );

  todoListItem = {
    [Number(documentSnapshot.id)]: {
      info,
      period,
    },
  };

  return todoListItem;
};
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
    .collection(PATH_USERS)
    .doc(userId)
    .collection(PATH_TODOLIST)
    .onSnapshot((querySnapshot) => {
      let todoListObj: TTodoList = {};

      querySnapshot.forEach((documentSnapshot) => {
        const todoListItem = createTodoListItemForRedux(documentSnapshot);
        todoListObj = { ...todoListObj, ...todoListItem };
      });

      store.dispatch(todosActions.addTodoList(todoListObj));
    });

  return subscriber;
};

/**
 * 파이어 스토어 할일 저장
 *
 */
export const addTodoInFirestore = async (todoParams: TTodo) => {
  const { userId } = store.getState().user.info;

  try {
    if (!userId) throw new Error('UserId undefined');
    await firestore()
      .collection(PATH_USERS)
      .doc(userId)
      .collection(PATH_TODOLIST)
      .doc(String(todoParams.id))
      .set(todoParams);
    return true;
  } catch (error) {
    return false;
  }
};

/** 파이어 스토어 할일 업데이트 */
export const updateTodoInFirestore = async (todoParams: TTodo) => {
  const { userId } = store.getState().user.info;
  try {
    if (!userId) throw new Error('UserId undefined');
    await firestore()
      .collection(PATH_USERS)
      .doc(userId)
      .collection(PATH_TODOLIST)
      .doc(String(todoParams.id))
      .update(todoParams);
    return true;
  } catch (error) {
    return false;
  }
};

/** 파이어 스토어 할일 삭제 */
export const deleteTodoInFirestore = async (taskId: string) => {
  const { userId } = store.getState().user.info;

  try {
    if (!userId) throw new Error('UserId undefined');

    await firestore()
      .collection(PATH_USERS)
      .doc(userId)
      .collection(PATH_TODOLIST)
      .doc(taskId)
      .delete();
    return true;
  } catch (error) {
    return false;
  }
};

export const getTodoListFromFirestore = async () => {
  const { userId } = store.getState().user.info;
  if (!userId) throw new Error('UserId undefined');
  const querySnapshot = firestore()
    .collection(PATH_USERS)
    .doc(userId)
    .collection(PATH_TODOLIST)
    .get();

  return querySnapshot;
};

export default addFirestoreListenerOnTodoList;
