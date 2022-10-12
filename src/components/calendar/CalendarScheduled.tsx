import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { OrangeTouchable } from '../../styles/styledComponents/components';
import DateString from '../../utils/dateUtils';
import CalendarArrow from './CalendarArrow';
import { DotStyle } from './calendarStyle';

interface IProps {}

function CalendarScheduled({}: IProps) {
  // 오늘 날짜
  const [initialDate, setInitialDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date())
  );
  // 검색 가능한 범위 : 50년
  const [minDate, setMinDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), -50)
  );
  const [maxDate, setMaxDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), 50)
  );

  return (
    <View style={{}}>
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
        showWeekNumbers
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => {
          console.log('onPressArrowLeft', subtractMonth);
          subtractMonth();
        }}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => {
          console.log('onPressArrowRight', addMonth);
          addMonth();
        }}
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

        markingType="multi-dot"
        markedDates={{
          '2022-10-17': {
            dots: [
              DotStyle.vacation,
              DotStyle.workout,
              DotStyle.massage,
              DotStyle.meeting,
            ],
          },
          '2022-10-18': { dots: [DotStyle.massage] },
          '2022-10-19': { dots: [DotStyle.massage] },
          '2022-10-20': {
            dots: [DotStyle.vacation, DotStyle.workout, DotStyle.massage],
          },
          '2022-10-21': {
            dots: [DotStyle.vacation, DotStyle.workout, DotStyle.massage],
          },
        }}
      />
    </View>
  );
}

export default CalendarScheduled;