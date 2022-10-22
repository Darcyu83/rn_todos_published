import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

export interface IMarkedDatesCustomed {
  [key: string]: MarkingProps & { taskCnt: number };
}
