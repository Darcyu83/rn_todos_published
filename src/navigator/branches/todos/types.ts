import { DateData } from 'react-native-calendars';
import { TTodo } from '../../../redux/todos/types';

export type TTodosNavParams = {
  TodosMainScrn: undefined;
  TodosDetailedListScrn: { clickedDateData: DateData };
};
