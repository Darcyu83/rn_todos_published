import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

import firestore from '@react-native-firebase/firestore';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import { TTodo } from '../../redux/todos/types';
import TodoCard from '../todos/TodoCard';
import { AppStyles } from '../../styles/appStyles';
import { theme } from '../../styles/theme';
import { useAppSelector } from '../../redux/hooks';
import { onCreateTodoParams } from '../todos/todosUtils';
import DateString from '../../utils/dateUtils';

const TodosFirestoreScrn = ({}: any) => {
  const {
    info: { userNm },
  } = useAppSelector((state) => state.user);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const cntRef = useRef(0);
  const makeId = (): Promise<string | null> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(`id${cntRef.current++}`);
      }, 3000);
    });
  };

  const addTaskToFirestore = async () => {
    console.log('3초 경과 아이디 발행시작');
    const id = await makeId();
    console.log('3초 경과 아이디 발행완료', id);
    if (!userNm) return;
    if (!id) return;
    if (!input1) return;
    if (!input2) return;

    try {
      await firestore().collection(userNm).doc('todoList').collection(id).add({
        id,
        input1,
        input2,
      });
      setInput1('');
      setInput2('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userNm) return;
    firestore()
      .collection(userNm)
      .onSnapshot(() => {
        console.log('./userEmail/ collection snapshot');
      });
  }, []);
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
            title="Click to add task to firestore"
            onPress={() => {
              addTaskToFirestore();
            }}
          />
        </View>

        <Text style={[{ fontWeight: 'bold' }, AppStyles.lightText]}>
          Data structure
        </Text>
        <Text style={{ color: 'white' }}>
          {`  ─ project name : rnTodosPublished

                └ todosList(collection) 

                    └ userEmail as ID(Document)

                        └ taskId(Collection)

                            └ info(document) 

                                └ {
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
                                  }`}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TodosFirestoreScrn;
