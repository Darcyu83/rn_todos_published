import { NavigatorScreenParams } from '@react-navigation/native';
import { TBedTimeNavParams } from './branches/bedTime/types';
import { TTodosNavParams } from './branches/todos/types';
import { TUserNavParams } from './branches/user/types';

export type TRootNavParamsList = {
  todos: NavigatorScreenParams<TTodosNavParams>;
  todosFiresstore: undefined;
  auth: TUserNavParams;
  user: TUserNavParams;
  bedtime: TBedTimeNavParams;
};
