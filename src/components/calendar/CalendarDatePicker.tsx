import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import styled from 'styled-components/native';
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
} from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { ModalTranspBgView } from '../../styles/styledComponents/components';
import DateString from '../../utils/dateUtils';
import CalendarArrow from './CalendarArrow';
import { DotStyle, periodStyle } from './calendarStyle';
import { SCREEN_WIDTH } from '../../styles/constants';
import { theme } from '../../styles/theme';

const CalendarWrapper = styled.View`
  overflow: hidden;
  width: 100%;
  border-radius: 15px;
  z-index: 10;
`;

interface IProps {}

function CalendarDatePicker({}: IProps) {
  const [initialDate, setInitialDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date())
  );
  const [minDate, setMinDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), -50)
  );
  const [maxDate, setMaxDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), 50)
  );

  const [startDt, setStartDt] = useState<DateData | null>(null);
  const [endDt, setEndDt] = useState<DateData | null>(null);

  const [markedDates, setMarkedDates] = useState<MarkedDates>();

  // 날짜 변경 후 달력에 MARKING 표시
  const onDateDataChangedHandler = useCallback(() => {
    console.log('startDt, endDt === ', startDt, endDt);

    let _markedDates: MarkedDates;

    if (!startDt) return;
    _markedDates = {
      [startDt.dateString]: periodStyle.single,
    };
    setMarkedDates(_markedDates);

    if (!endDt) return;
    _markedDates = {};

    // 시작일 = 종료일
    if (startDt.dateString === endDt.dateString) {
      _markedDates = { [startDt.dateString]: periodStyle.single };
      setMarkedDates(_markedDates);
      return;
    }

    // 시작일 !== 종료일
    const startDateObj = new Date(startDt.dateString);
    const endDateObj = new Date(endDt.dateString);

    const dateStrings = [
      DateString.convertDateToYYYYMMDD(new Date(endDt.dateString)),
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

    setMarkedDates(_markedDates);
  }, [startDt, endDt]);

  // 날짜 클릭
  const onClickDayHandler = (clickedDay: DateData) => {
    // start date null -> 시작일 바로 입력
    if (!startDt) {
      setStartDt(clickedDay);
      return;
    }

    // 시작일 === 종료일
    if (startDt.dateString === clickedDay.dateString) {
      setEndDt(clickedDay);
      return;
    }

    // 종료일이 시작일보다 클때
    if (Number(startDt.timestamp) > Number(clickedDay.timestamp)) {
      setStartDt(clickedDay);
      setEndDt(null);
    }
  };

  // 시작일 종료일 바뀔경우
  useEffect(() => {
    onDateDataChangedHandler();
  }, [startDt, endDt, onDateDataChangedHandler]);

  return (
    <CalendarWrapper>
      {/* 달력 */}
      <Calendar
        // Initially visible month. Default = now
        initialDate={initialDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={minDate}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={maxDate}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log('selected day', day);
          onClickDayHandler(day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat="yyyy MM"
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => (
          <CalendarArrow
            direction={direction}
            // setInitialDate={setInitialDate}
          />
        )}
        // Do not show days of other months in month page. Default = false
        hideExtraDays
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft
        // Disable right arrow. Default = false
        disableArrowRight
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays
        // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={date => {

        //   }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths
        // Collection of dates that have to be marked. Default = {}

        markingType="period"
        markedDates={markedDates}
      />
    </CalendarWrapper>
  );
}

export default CalendarDatePicker;
