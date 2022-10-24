import { TTodo } from '../../../redux/todos/types';

export type TTodosNavParams = {
  TodosMainScrn: undefined;
  TodosDetailedListScrn: { dailyTasks: TTodo[] };
};
