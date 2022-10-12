import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ModalTranspBgView } from '../../styles/styledComponents/components';
import DateString from '../../utils/dateUtils';
import CalendarArrow from './CalendarArrow';
import { DotStyle } from './calendarStyle';
import { SCREEN_WIDTH } from '../../styles/constants';

const CalendarContainer = styled.View`
  width: 95%;
`;
const CalendarWrapper = styled.View`
  overflow: hidden;
  width: 100%;
  border-radius: 15px;
  z-index: 10;
`;

const BtnClosingTouchable = styled.TouchableOpacity`
  width: ${SCREEN_WIDTH * 0.1}px;
  height: ${SCREEN_WIDTH * 0.1}px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: -${SCREEN_WIDTH * 0.11}px;
  right: 0;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

function CalendarDatePickerModal({ visible, closeModal }: IProps) {
  const [initialDate, setInitialDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date())
  );
  const [minDate, setMinDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), -50)
  );
  const [maxDate, setMaxDate] = useState(
    DateString.convertDateToYYYYMMDD(new Date(initialDate), 50)
  );

  return (
    <Modal transparent visible={visible}>
      <ModalTranspBgView>
        <CalendarContainer>
          {/* 닫기 버튼 */}
          <BtnClosingTouchable
            onPress={() => {
              closeModal();
            }}
          >
            <Text>X</Text>
          </BtnClosingTouchable>
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
              markedDates={{
                '2022-10-15': { marked: true, dotColor: '#50cebb' },
                '2022-10-16': { marked: true, dotColor: '#50cebb' },
                '2022-10-21': {
                  startingDay: true,
                  color: '#50cebb',
                  textColor: 'white',
                },
                '2022-10-22': { color: '#70d7c7', textColor: 'white' },
                '2022-10-23': {
                  color: '#70d7c7',
                  textColor: 'white',
                  marked: true,
                  dotColor: 'white',
                },
                '2022-10-24': { color: '#70d7c7', textColor: 'white' },
                '2022-10-25': {
                  endingDay: true,
                  color: '#50cebb',
                  textColor: 'white',
                },
              }}
            />
          </CalendarWrapper>
        </CalendarContainer>
      </ModalTranspBgView>
    </Modal>
  );
}

export default CalendarDatePickerModal;
