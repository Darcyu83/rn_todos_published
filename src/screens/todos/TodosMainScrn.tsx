import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import styled from 'styled-components/native';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import { returnLoadingScrn } from '../../components/loader/Loading';
import { useAppSelector } from '../../redux/hooks';
import { TTodosInitialState } from '../../redux/todos/types';
import {
  OrangeTouchable,
  SafeAreaCustomized,
  ScrnTitle,
} from '../../styles/styledComponents/components';
import { theme } from '../../styles/theme';
import { getThemeStyle, onToggleDarkMode } from '../../utils/themeUtils';
import TodoCard from './TodoCard';
import TodoRegisModal from './TodoRegistModal';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;
const ToggleThemeView = styled.View`
  background-color: ${(props) => props.theme.content_bg_primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface IProps {}

function TodosMainScrn({}: IProps) {
  const [isDatePickerModalShown, setIsDatePickerModalShown] = useState(false);

  const { list: todosList, markedDates } = useAppSelector(
    (state) => state.todos
  );

  return (
    <SafeAreaCustomized>
      <Container>
        <ScrollView>
          {/* <ToggleThemeView>
          <Button title="Toggle DarkMode" onPress={onToggleDarkMode} />
        </ToggleThemeView> */}
          {/* 일정 달력 */}
          <CalendarScheduled todosList={todosList} />

          {/* <FlatList
          style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
          contentContainerStyle={{ borderRadius: 3, marginTop: 3 }}
          data={todosList}
          renderItem={({ item, index }) => (
            <TodoCard todo={item} index={index} />
          )}
          ListHeaderComponent={() => <CalendarScheduled />}
        /> */}

          {/* 등록 버튼 */}
          <KeyboardAvoidingView>
            <OrangeTouchable
              onPress={() => {
                setIsDatePickerModalShown(true);
              }}
            >
              <Text>Regist new Todos</Text>
            </OrangeTouchable>
          </KeyboardAvoidingView>

          {/* 일정 등록 모달 */}
          <TodoRegisModal
            visible={isDatePickerModalShown}
            closeModal={() => setIsDatePickerModalShown(false)}
          />
        </ScrollView>
      </Container>
    </SafeAreaCustomized>
  );
}

export default TodosMainScrn;
