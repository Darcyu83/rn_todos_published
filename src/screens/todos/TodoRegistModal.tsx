import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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

import firestore from '@react-native-firebase/firestore';
import { onCreateTodoParams } from './todosUtils';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { AddIcon, PlusIcon } from '../../components/icons/pngs';

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
  taskModified: TTodo | null;
}

const periodInitialState = {
  startDtData: null,
  endDtData: null,
};
function TodoRegistModal({ visible, closeModal, taskModified }: IProps) {
  const user = useAppSelector((state) => state.user);
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

    const params = onCreateTodoParams(
      cateSelected,
      startDtData,
      endDtData,
      todoTitle,
      todoContent
    );
    dispatch(todosActions.addTodo(params));
    onResetStates();
    closeModal();
  };

  const onUpdateTodoHandler = () => {
    if (!taskModified) {
      Alert.alert('No target to update');
      return;
    }

    if (!todoTitle) {
      Alert.alert('No Title');
      return;
    }
    if (!startDtData || !endDtData) {
      Alert.alert('No Start / End Date');
      return;
    }

    const params = onCreateTodoParams(
      cateSelected,
      startDtData,
      endDtData,
      todoTitle,
      todoContent
    );

    params.id = taskModified.id;
    dispatch(todosActions.updateTodo(params));
    onResetStates();
    closeModal();
  };

  useEffect(() => {
    // 수정 보드인지 체크
    console.log('taskModified', taskModified);
    if (taskModified) {
      setCateSelected(taskModified.category);
      setTodoTitle(taskModified.title);
      setTodoContent(taskModified.todo);
      setPeriodData({
        startDtData: taskModified.startDtData,
        endDtData: taskModified.endDtData,
      });
    }
  }, [taskModified]);

  useEffect(() => {
    return () => {
      onResetStates();
    };
  }, []);

  // firestore==============================================================
  const todosCollection = firestore().collection('todos');

  const addTodoInFirestore = async () => {
    if (!todoTitle) {
      Alert.alert('No Title');
      return;
    }
    if (!startDtData || !endDtData) {
      Alert.alert('No Start / End Date');
      return;
    }
    const params: TTodo = onCreateTodoParams(
      cateSelected,
      startDtData,
      endDtData,
      todoTitle,
      todoContent
    );
    // const documentData = await todosCollection.add(params);
    if (!user.info.userNm) return;

    const documentData = await todosCollection
      .doc(String(params.id))
      .set(params);

    console.log('documentData=== ', documentData);
    onResetStates();
    closeModal();
  };
  return (
    <Modal transparent visible={visible}>
      <Container>
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
        <KeyboardAvoidingView style={{}}>
          <OrangeTouchable
            style={{ marginVertical: 3 }}
            onPress={addTodoInFirestore}
          >
            <Text>Click to Add todos in firestore</Text>
          </OrangeTouchable>

          <OrangeTouchable
            style={{ marginVertical: 3 }}
            onPress={taskModified ? onUpdateTodoHandler : onAddTodoHandler}
          >
            <Text>Click to Add or Update</Text>
          </OrangeTouchable>
          <OrangeTouchable
            style={{ marginVertical: 3 }}
            onPress={onClearTodoList}
          >
            <Text>Remove All Todos</Text>
          </OrangeTouchable>
        </KeyboardAvoidingView>
      </Container>
    </Modal>
  );
}

export default TodoRegistModal;
