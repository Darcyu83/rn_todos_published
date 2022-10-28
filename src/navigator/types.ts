import { TBedTimeNavParams } from './branches/bedTime/types';
import { TTodosNavParams } from './branches/todos/types';

export type TRootNavParamsList = {
  todos: TTodosNavParams;
  auth: undefined;
  user: undefined;
  bedtime: TBedTimeNavParams;
};
