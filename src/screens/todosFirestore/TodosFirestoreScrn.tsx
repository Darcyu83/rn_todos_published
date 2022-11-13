import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, Animated, Modal, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

import firestore from '@react-native-firebase/firestore';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import { TTodo, TTodoList } from '../../redux/todos/types';
import TodoCard from '../todos/TodoCard';
import { AppStyles } from '../../styles/appStyles';
import { theme } from '../../styles/theme';
import { useAppSelector } from '../../redux/hooks';
import { onCreateTodoParams } from '../todos/todosUtils';
import DateString from '../../utils/dateUtils';
import TodoRegistModal from '../todos/TodoRegistModal';
import TaskIndicator from '../../components/calendar/TaskIndicator';
import CalendarScheduled from '../../components/calendar/CalendarScheduled';
import { crateDatesStringArr } from '../../utils/calendarUtils';
import { returnLoadingScrn } from '../../components/loader/Loading';

const structureStr = ` ─ project name : rnTodosPublished
              └ users as ID(Collection) - listener point 

                  └ userEmail as ID(Document) - listener point 
                      └ userInfo(field variable)
                      └ todosList(Collection) - listener point 

                          └ taskId(Document) - listener point(x) 
                              └ (field variable){
                                      category: TTodoCate;
                                      isInSingleDay: boolean;
                                      id: number;
                                      title: string;
                                      todo: string;
                                      startDtData: DateData                        
                                          └  {
                                              year: number;
                                              month: number;
                                              day: number;
                                              timestamp: number;
                                              dateString: string;
                                          };
                                      endDtData: DateData
                                          └  {
                                              year: number;
                                              month: number;
                                              day: number;
                                              timestamp: number;
                                              dateString: string;
                                          };
                                  }`;
const TodosFirestoreScrn = ({}: any) => {
  const {
    info: { userNm },
  } = useAppSelector((state) => state.user);

  const [isRegModalShown, setIsRegModalShown] = useState(false);
  const [todoList, setTodoList] = useState<TTodoList>({});

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const makeId = (): Promise<string | null> => {
    const date = new Date();
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(`id${date.getTime()}`);
      }, 3000);
    });
  };

  const addUserInfoToFirestore = useCallback(async () => {
    if (!userNm) return;

    firestore()
      .collection('users')
      .doc(userNm)
      .set({ id: userNm, birth: input1, country: input2 });
  }, [input1, input2]);

  const addTaskToFirestore = async () => {
    console.log('3초 경과 아이디 발행시작');
    setIsProcessing(true);

    const id = await makeId();
    console.log('3초 경과 아이디 발행완료', id);
    if (!userNm) return;
    if (!id) return;
    if (!input1) return;
    if (!input2) return;

    try {
      await firestore()
        .collection('users')
        .doc(userNm)
        .collection('todoList')
        .doc(id)
        .set({
          id,
          input1,
          input2,
        });
      setInput1('');
      setInput2('');
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!userNm) return;

    // users collection listener
    firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            '%c  ./userEmail/ collection documentSnapshot',
            'background-color: dodgerblue',
            documentSnapshot.data()
          );
        });
      });

    // users/userEmail document listener
    firestore()
      .collection('users')
      .doc(userNm)
      .onSnapshot((documentSnapshot) => {
        console.log(
          '%c users/userEmail documentSnapshot',
          'background-color: black; color: white',
          documentSnapshot.data()
        );
      });

    // users/userEmail/todoList collection listener
    firestore()
      .collection('users')
      .doc(userNm)
      .collection('todoList')
      .onSnapshot((querySnapshot) => {
        let todoListObj: TTodoList = {};
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            '%c users/userEmail/todoList collection documentSnapshot',
            'background-color: red',
            documentSnapshot.data()
          );

          const info: TTodo = documentSnapshot.data() as TTodo;
          const period = crateDatesStringArr(
            info.startDtData.dateString,
            info.endDtData.dateString
          );

          todoListObj = {
            ...todoListObj,
            [Number(documentSnapshot.id)]: {
              info,
              period,
            },
          };
        });

        setTodoList(todoListObj);
      });
  }, []);

  returnLoadingScrn(isProcessing);

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <Text>Temporary Test Screen for Firestore</Text>
      <ScrollView>
        <Text>List of Todos</Text>

        <TextInput
          style={[AppStyles.textInput]}
          value={input1}
          onChangeText={setInput1}
        />
        <TextInput
          style={[AppStyles.textInput]}
          value={input2}
          onChangeText={setInput2}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <InlineTextButton
            title="Click to open regitst modal"
            onPress={() => {
              setIsRegModalShown(true);
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <InlineTextButton
            title="Click to add task to firestore"
            onPress={() => {
              addTaskToFirestore();
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <InlineTextButton
            title="Click to add userInfo to firestore"
            onPress={() => {
              addUserInfoToFirestore();
            }}
          />
        </View>
        {Object.keys(todoList).map((key, idx) => (
          <Text key={idx} style={{ color: 'white', backgroundColor: 'teal' }}>
            {todoList[Number(key)].info.title} /{' '}
            {todoList[Number(key)].info.todo}/{' '}
            {todoList[Number(key)].info.startDtData.dateString}~
            {todoList[Number(key)].info.endDtData.dateString}
          </Text>
        ))}

        {/* 할일 구분 */}
        {/* <TaskIndicator /> */}

        {/* 일정 달력 */}
        {/* <CalendarScheduled
          markedDates={markedDates}
          onMoveToDailyTasks={onMoveToDailyTasks}
        /> */}

        <Text style={[{ fontWeight: 'bold' }, AppStyles.lightText]}>
          Data structure
        </Text>

        {structureStr.split('\n').map((lineTxt, idx) => (
          <Text key={idx} style={{ color: 'white', fontSize: 12 }}>
            {lineTxt}
          </Text>
        ))}
      </ScrollView>

      <TodoRegistModal
        visible={isRegModalShown}
        closeModal={() => {
          setIsRegModalShown(false);
        }}
        taskModified={null}
      />
    </View>
  );
};

export default TodosFirestoreScrn;
