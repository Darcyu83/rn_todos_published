import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import DateString from './dateUtils';
import { DotStyle, periodStyle } from '../styles/calendarStyle';
import { TTodoList } from '../redux/todos/types';
import { TMarkedDatesCustomed } from '../components/calendar/types';

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

export const createScheduledDotMakredDates = (todosList: TTodoList) => {
  // 캘린더 날짜 마킹 정보
  let _markedDates: TMarkedDatesCustomed = {};

  const taskIds = Object.keys(todosList);

  for (let j = 0; j < taskIds.length; j++) {
    const tskId = taskIds[j];
    const id = Number(tskId);
    const taskCate = todosList[id].info.category;
    const dateStringsArr = todosList[id].period;

    // 스타일 정보
    const cateStyle = DotStyle[taskCate];

    for (let i = 0; i < dateStringsArr.length; i++) {
      // 해당 날짜가 처음 등록

      if (!_markedDates[dateStringsArr[i]]) {
        _markedDates = {
          // 기존 날짜값 복사
          ..._markedDates,
          // 새로 추가할 날짜 추가 : 신규
          [dateStringsArr[i]]: {
            dots: [cateStyle],
            ...{ tskIds: [tskId] }, // 해당날짜 신규 타스크 : 카운트 1
          },
        };
        // continue;
      }

      // 해당 날짜가 이미 등록
      const existingDots = _markedDates[dateStringsArr[i]].dots || [];
      // 카테고리 스타일 값이 이미 등록되어있는지 체크
      const _dots = existingDots.some((dotStyle) => dotStyle.key === taskCate)
        ? existingDots
        : existingDots.concat(cateStyle);

      _markedDates = {
        // // 기존 날짜값 복사
        ..._markedDates,
        // // 새로 추가할 날짜 추가 : 이미 추가되어 있음
        [dateStringsArr[i]]: {
          dots: _dots,
          tskIds: _markedDates[dateStringsArr[i]].tskIds.concat(tskId),
        },
      };
    }
  }

  return _markedDates;
};

export const createPeriodMarkedDates = (
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

export default { createPeriodMarkedDates };
