import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { Storage } from 'redux-persist/lib/types';

export interface TMarkedDatesCustomed {
  [key: string]: MarkingProps & { tskIds: string[] };
}

export interface TDot {
  key?: string;
  color: string;
  selectedDotColor?: string;
}
