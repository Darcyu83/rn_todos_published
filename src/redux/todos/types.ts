import { DateData } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';

export interface TTodo {
  category: 'vacation' | 'massage' | 'workout' | 'meeting' | 'etc';
  isInSingleDay: boolean;
  id: number;
  title: string;
  todo: string;
  startDtData: DateData;
  endDtData: DateData;
}

export interface TTodoList {
  [taskId: number]: { info: TTodo; period: string[] };
}
export interface TTodosInitialState {
  list: TTodoList;
  markedDates?: {
    [key: string]: MarkingProps & { taskCnt: number };
  };
}
