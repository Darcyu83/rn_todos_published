import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import DateString from './dateUtils';
import { periodStyle } from '../styles/calendarStyle';

export const crateDatesStringArr = (
  startDtString: string,
  endDtString: string
): string[] => {
  // 시작일 !== 종료일
  const startDateObj = new Date(startDtString);
  const endDateObj = new Date(endDtString);

  const dateStrings = [DateString.convertDateToYYYYMMDD(new Date(endDtString))];

  // 날짜 키 생성
  while (endDateObj.getTime() !== startDateObj.getTime()) {
    const dateString = DateString.convertDateToYYYYMMDD(
      new Date(endDateObj.setDate(endDateObj.getDate() - 1))
    );

    dateStrings.unshift(dateString);
  }

  console.log('dateStrings === ', dateStrings);

  return dateStrings;
};

export const createMarkedDates = (
  startDtData: DateData | null,
  endDtData: DateData | null
): MarkedDates => {
  console.log('startDt, endDt === ', startDtData, endDtData);

  let _markedDates: MarkedDates = {};

  // 시작일 없을경우
  if (!startDtData) {
    return _markedDates;
  }

  _markedDates = {
    [startDtData.dateString]: periodStyle.single,
  };

  // 종료일 없을 경우
  if (!endDtData) return _markedDates;

  _markedDates = {};

  // 시작일 = 종료일
  if (startDtData.dateString === endDtData.dateString) {
    _markedDates = { [startDtData.dateString]: periodStyle.single };
    return _markedDates;
  }

  const dateStrings = crateDatesStringArr(
    startDtData.dateString,
    endDtData.dateString
  );

  dateStrings.map((key, index) => {
    let style;

    switch (index) {
      case 0:
        style = periodStyle.start;
        break;
      case dateStrings.length - 1:
        style = periodStyle.end;
        break;
      default:
        style = periodStyle.mid;
    }

    _markedDates = { ..._markedDates, [key]: style };
    return null;
  });

  return _markedDates;
};

export default { createMarkedDates };
