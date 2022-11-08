import { DateData } from 'react-native-calendars';
import { TMarkedDatesCustomed } from '../../components/calendar/types';
import { TTodo, TTodoList } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';

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

export const createDailyDetailedTaskList = (
  todosList: TTodoList,
  clickedDay: DateData
) => {
  // 리스트 생성
  const dailyTaskIds = Object.keys(todosList).filter((taskId) =>
    todosList[Number(taskId)].period.includes(clickedDay.dateString)
  );

  const dailyTasks: TTodo[] = dailyTaskIds.map(
    (id) => todosList[Number(id)].info
  );

  return dailyTasks;
};
