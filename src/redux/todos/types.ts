import { DateData } from 'react-native-calendars';

export interface TTodo {
  category: 'vacation' | 'massage' | 'workout' | 'meeting' | 'etc';
  isInSingleDay: boolean;
  id: number;
  title: string;
  todo: string;
  startDtData: DateData;
  endDtData: DateData;
}

export interface TTodosInitialState {
  list: { [taskId: number]: { info: TTodo; period: string[] } };
}
