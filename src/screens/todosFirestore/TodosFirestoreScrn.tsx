import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import { DateData } from 'react-native-calendars';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

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
import {
  crateDatesStringArr,
  createScheduledDotMakredDates,
} from '../../utils/calendarUtils';
import { returnLoadingScrn } from '../../components/loader/Loading';
import { TMarkedDatesCustomed } from '../../components/calendar/types';
import { TRootNavParamsList } from '../../navigator/types';

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
function TodosFirestoreScrn({
  navigation,
}: NativeStackScreenProps<TRootNavParamsList, 'todos'>) {
  const {
    info: { userId },
  } = useAppSelector((state) => state.user);

  const [isRegModalShown, setIsRegModalShown] = useState(false);
  const [markedDates, setMarkedDates] = useState<TMarkedDatesCustomed>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const onMoveToDailyTasks = (clickedDateData: DateData) => {
    // navigation.navigate('todosFirestore');
  };

  useEffect(() => {
    if (!userId) return;

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
      .doc(userId)
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
      .doc(userId)
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

        const _markedDates = createScheduledDotMakredDates(todoListObj);
        setMarkedDates(_markedDates);
      });
  }, [userId]);

  returnLoadingScrn(isProcessing);

  return (
    <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: 5 }}>
      <Text>Temporary Test Screen for Firestore</Text>
      <ScrollView>
        <Text>List of Todos</Text>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <InlineTextButton
            title="Click to open regitst modal"
            onPress={() => {
              setIsRegModalShown(true);
            }}
          />
        </View>

        {/* 할일 구분 */}
        {/* <TaskIndicator /> */}

        {/* 일정 달력 */}
        <CalendarScheduled
          markedDates={markedDates}
          onMoveToDailyTasks={onMoveToDailyTasks}
        />

        <Text style={[{ fontWeight: 'bold' }, AppStyles.lightText]}>
          Data structure
        </Text>

        {structureStr.split('\n').map((lineTxt, idx) => (
          <Text
            key={`${idx.toString()}1`}
            style={{ color: 'white', fontSize: 12 }}
          >
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
    </SafeAreaView>
  );
}

export default TodosFirestoreScrn;
