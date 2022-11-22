import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components/native';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarDatePicker from '../../components/calendar/CalendarDatePicker';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo, TTodoList } from '../../redux/todos/types';
import { DotStyle } from '../../styles/calendarStyle';
import {
  ModalTranspBgView,
  OrangeTouchable,
  SectionTitle,
} from '../../styles/styledComponents/components';
import { IPeriod } from './types';

import { onCreateTodoParams } from './todosUtils';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { AddIcon, PlusIcon } from '../../components/icons/pngs';
import { theme } from '../../styles/theme';
import { AppStyles } from '../../styles/appStyles';
import { addTodoInFirestore } from '../../utils/firestore';
import SafeLinearAreaHOC from '../../components/layout/SafeLinearAreaHOC';

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
const CalendarWrapper = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const TodoInputWrapper = styled.View`
  width: 100%;
`;

const BtnWrapper = styled.View`
  position: absolute;
  width: ${28}px;
  height: ${28}px;
  right: 5px;
  top: 5px;
  z-index: 99;
`;

interface IProps {
  visible: boolean;
  closeModal: () => void;
  taskIdBeModified: number | null;
}

const periodInitialState = {
  startDtData: null,
  endDtData: null,
};
function TodoRegistModal({ visible, closeModal, taskIdBeModified }: IProps) {
  const { list: todoList } = useAppSelector((state) => state.todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');
  const [{ startDtData, endDtData }, setPeriodData] =
    useState<IPeriod>(periodInitialState);

  const [isOnSaving, setIsOnSaving] = useState(false);

  // 할일 카테고리 구분
  const [isCatePickerOpen, setIsCatePickerOpen] = useState(false);
  const onShowCatePickerHandler = () => {
    setIsCatePickerOpen((curr) => !curr);
  };
  const [cateSelected, setCateSelected] = useState<
    null | 'vacation' | 'message' | 'workout' | 'meeting' | 'etc'
  >(null);

  // 입력값 초기화
  const onResetStates = () => {
    setTodoTitle('');
    setTodoContent('');
    setCateSelected(null);
    setPeriodData(periodInitialState);
  };

  const dispatch = useAppDispatch();

  const onClearTodoList = () => {
    dispatch(todosActions.clearAllTodos());
  };

  const onAddTodoHandler = () => {
    setIsOnSaving(true);
    if (!todoTitle || !startDtData || !endDtData) {
      Alert.alert('Please input all the information');
      setIsOnSaving(false);
      return;
    }

    const params = onCreateTodoParams(
      cateSelected,
      startDtData,
      endDtData,
      todoTitle,
      todoContent
    );
    dispatch(todosActions.addTodo(params));
    setIsOnSaving(false);
    onResetStates();
    closeModal();
  };

  const onUpdateTodoHandler = () => {
    setIsOnSaving(true);

    if (!taskIdBeModified || !todoTitle || !startDtData || !endDtData) {
      Alert.alert('Please input all the information');
      setIsOnSaving(false);
      return;
    }

    const params = onCreateTodoParams(
      cateSelected,
      startDtData,
      endDtData,
      todoTitle,
      todoContent
    );

    params.id = taskIdBeModified;

    dispatch(todosActions.updateTodo(params));
    setIsOnSaving(false);
    onResetStates();
    closeModal();
  };

  useEffect(() => {
    // 수정 보드인지 체크
    console.log('taskIdBeModified', taskIdBeModified);
    if (taskIdBeModified) {
      setCateSelected(todoList[taskIdBeModified].info.category);
      setTodoTitle(todoList[taskIdBeModified].info.title);
      setTodoContent(todoList[taskIdBeModified].info.todo);
      setPeriodData({
        startDtData: todoList[taskIdBeModified].info.startDtData,
        endDtData: todoList[taskIdBeModified].info.endDtData,
      });
    }
  }, [todoList, taskIdBeModified]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) onResetStates();
  }, [isFocused]);

  return (
    <Modal transparent visible={visible}>
      <Container>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']}
        >
          {isOnSaving && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 999,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.darkMode.text, fontSize: 24 }}>
                Saving...
              </Text>
            </View>
          )}

          {/* 닫기 버튼 */}
          <BtnWrapper>
            <OrangeTouchable
              onPress={() => {
                closeModal();
              }}
            >
              <View style={{ transform: [{ rotate: '45deg' }] }}>
                <PlusIcon />
              </View>
            </OrangeTouchable>
          </BtnWrapper>

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
                label: capitalizeFirstLetter(key),
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
                style={{ color: 'white' }}
                placeholderTextColor="skyblue"
                placeholder="Input Title..."
                value={todoTitle}
                onChangeText={(txt) => setTodoTitle(txt)}
              />

              {/* 할일 내용 */}
              <SectionTitle>What to do</SectionTitle>
              <TextInput
                style={{ color: 'white' }}
                placeholderTextColor="skyblue"
                placeholder="Input Details..."
                value={todoContent}
                onChangeText={setTodoContent}
              />

              {/* 시작일  */}
              <SectionTitle>Start Date</SectionTitle>

              <TextInput
                editable={false}
                style={{ color: 'white' }}
                value={
                  startDtData ? startDtData.dateString : '시작일을 선택하세요.'
                }
              />
              {/* 종료일  */}
              <SectionTitle>End Date</SectionTitle>
              <TextInput
                editable={false}
                style={{ color: 'white' }}
                value={
                  endDtData ? endDtData.dateString : '종료일을 선택하세요.'
                }
              />
            </TodoInputWrapper>
          </ScrollView>

          {/* 일정 등록 버튼 */}
          <KeyboardAvoidingView style={{ width: '100%', marginVertical: 10 }}>
            <OrangeTouchable
              style={{
                minHeight: 25,
                marginTop: 5,
                justifyContent: 'center',
                padding: 5,
              }}
              onPress={() => {
                Keyboard.dismiss();
                taskIdBeModified ? onUpdateTodoHandler() : onAddTodoHandler();
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Click to Add or Update in Redux
              </Text>
            </OrangeTouchable>
            <OrangeTouchable
              style={{
                minHeight: 25,
                marginTop: 5,
                justifyContent: 'center',
                padding: 5,
              }}
              onPress={onClearTodoList}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Remove All Todos in redux
              </Text>
            </OrangeTouchable>
          </KeyboardAvoidingView>
        </LinearGradient>
      </Container>
    </Modal>
  );
}

export default TodoRegistModal;
