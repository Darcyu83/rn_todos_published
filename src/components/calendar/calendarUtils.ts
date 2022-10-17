import { DateData, MarkedDates } from "react-native-calendars/src/types";
import DateString from "../../utils/dateUtils";
import { periodStyle } from "./calendarStyle";

export const createMarkedDates = (startDtData:DateData | null ,endDtData:DateData | null) : MarkedDates | null=> {
    console.log('startDt, endDt === ', startDtData, endDtData);

    let _markedDates: MarkedDates;

    // 시작일 없을경우 
    if (!startDtData) return null;
    
 
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
      ;
    }

    // 시작일 !== 종료일
    const startDateObj = new Date(startDtData.dateString);
    const endDateObj = new Date(endDtData.dateString);

    const dateStrings = [
      DateString.convertDateToYYYYMMDD(new Date(endDtData.dateString)),
    ];

    // 날짜 키 생성
    while (endDateObj.getTime() !== startDateObj.getTime()) {
      const dateString = DateString.convertDateToYYYYMMDD(
        new Date(endDateObj.setDate(endDateObj.getDate() - 1))
      );

      dateStrings.unshift(dateString);
    }

    console.log('dateStrings === ', dateStrings);

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
  }