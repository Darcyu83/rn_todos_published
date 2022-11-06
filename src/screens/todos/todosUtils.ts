import { DateData } from 'react-native-calendars';

export const onCreateTodoParams = (
  cateSelected: 'vacation' | 'massage' | 'workout' | 'meeting' | 'etc' | null,
  startDtData: DateData,
  endDtData: DateData,
  todoTitle: string,
  todoContent: string
) => {
  return {
    category: cateSelected || 'vacation',
    isInSingleDay: startDtData.dateString === endDtData.dateString,
    id: new Date().getTime(),
    title: todoTitle,
    todo: todoContent,
    startDtData,
    endDtData: endDtData,
  };
};
