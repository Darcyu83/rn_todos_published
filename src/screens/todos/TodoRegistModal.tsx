import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import CalendarDatePicker from '../../components/calendar/CalendarDatePicker';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { DotStyle } from '../../styles/calendarStyle';
import {
  ModalTranspBgView,
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';
import { IPeriod } from './types';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
`;
const CalendarWrapper = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const TodoInputWrapper = styled.View`
  width: 100%;
`;

interface IProps {
  visible: boolean;
  closeModal: () => void;
}

const periodInitialState = {
  startDtData: null,
  endDtData: null,
};
function TodoRegistModal({ visible, closeModal }: IProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [{ startDtData, endDtData }, setPeriodData] =
    useState<IPeriod>(periodInitialState);

  //할일 카테고리 구분
  const [isCatePickerOpen, setIsCatePickerOpen] = useState(false);
  const onShowCatePickerHandler = () => {
    setIsCatePickerOpen((curr) => !curr);
  };
  const [cateSelected, setCateSelected] = useState<
    null | 'vacation' | 'massage' | 'workout' | 'meeting' | 'etc'
  >(null);

  useEffect(() => {
    console.log(
      'isCatePickerOpen---',
      isCatePickerOpen,
      'cateSelected---',
      cateSelected
    );
  }, [isCatePickerOpen]);
  const onResetStates = () => {
    setTodoTitle('');
    setTodoContent('');
    setPeriodData(periodInitialState);
  };

  const dispatch = useAppDispatch();

  const onClearTodoList = () => {
    dispatch(todosActions.clearAllTodos());
  };
  const onAddTodoHandler = () => {
    if (!todoTitle) {
      Alert.alert('No Title');
      return;
    }
    if (!startDtData || !endDtData) {
      Alert.alert('No Start / End Date');
      return;
    }
    dispatch(
      todosActions.addTodo({
        category: cateSelected || 'vacation',
        isInSingleDay: startDtData.dateString === endDtData.dateString,
        id: new Date().getTime(),
        title: todoTitle,
        todo: todoContent,
        startDtData,
        endDtData: endDtData,
      })
    );
    onResetStates();
    closeModal();
  };

  useEffect(() => {
    return () => {
      onResetStates();
    };
  }, []);

  return (
    <Modal transparent visible={visible}>
      <Container>
        {/* 닫기 버튼 */}
        <Button
          title="닫기"
          onPress={() => {
            closeModal();
          }}
        />

        {/* 달력 날짜 픽커 */}
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ padding: 10 }}
        >
          {/* 날짜 선택 */}
          <CalendarWrapper>
            <CalendarDatePicker
              startDtData={startDtData}
              endDtData={endDtData}
              setPeriod={setPeriodData}
            />
          </CalendarWrapper>

          {/* 데이터 입력 */}
          {/* 카테고리 선택 */}
          <DropDownPicker
            multiple={false}
            items={Object.keys(DotStyle).map((key) => ({
              label: key.charAt(0).toUpperCase() + key.slice(1),
              value: key,
            }))}
            open={isCatePickerOpen}
            setOpen={onShowCatePickerHandler}
            value={cateSelected}
            setValue={setCateSelected}
            listMode="SCROLLVIEW"
          />
          <TodoInputWrapper>
            {/* 할일 타이틀 */}
            <SectionTitle>Todo Title</SectionTitle>
            <TextInput
              placeholder="Input Title..."
              value={todoTitle}
              onChangeText={(txt) => setTodoTitle(txt)}
            />

            {/* 할일 내용 */}
            <SectionTitle>What to do</SectionTitle>
            <TextInput
              placeholder="Input Details..."
              value={todoContent}
              onChangeText={setTodoContent}
            />

            {/* 시작일  */}
            <SectionTitle>Start Date</SectionTitle>
            <TextInput
              editable={false}
              value={
                startDtData ? startDtData.dateString : '시작일을 선택하세요.'
              }
            />
            {/* 종료일  */}
            <SectionTitle>End Date</SectionTitle>
            <TextInput
              editable={false}
              value={endDtData ? endDtData.dateString : '종료일을 선택하세요.'}
            />
          </TodoInputWrapper>
        </ScrollView>

        {/* 일정 등록 버튼 */}
        <KeyboardAvoidingView>
          <OrangeTouchable onPress={onAddTodoHandler}>
            <Text>Click to Add</Text>
          </OrangeTouchable>
          <OrangeTouchable onPress={onClearTodoList}>
            <Text>Remove All Todos</Text>
          </OrangeTouchable>
        </KeyboardAvoidingView>
      </Container>
    </Modal>
  );
}

export default TodoRegistModal;
