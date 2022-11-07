import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

import firestore from '@react-native-firebase/firestore';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import { TTodo } from '../../redux/todos/types';
import TodoCard from '../todos/TodoCard';

const TodosFirestoreScrn = ({}: any) => {
  const todos_Collection = firestore().collection('todosList');
  const todos_userEmail_Doc = firestore()
    .collection('todosList')
    .doc('userEmail');
  const todos_userEmail_taskId_Collection = firestore()
    .collection('todosList')
    .doc('userEmail')
    .collection('taskId');
  const todos_userEmail_taskId_info_Doc = firestore()
    .collection('todosList')
    .doc('userEmail')
    .collection('taskId')
    .doc('info');

  const [todos, setTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    const onAwaitGets = async () => {
      const todos_Data = await todos_Collection.get();

      todos_Data.docs.map((doc) => {
        console.log(
          '%c todos_Collection ==== ',
          'background-color: red',
          doc.data(),
          todos_Collection.id
        );
      });

      const todos_userEmail_Data = await todos_userEmail_Doc.get();
      console.log(
        '%c todos_userEmail_Doc==== ',
        'background-color: dodgerblue',
        todos_userEmail_Data.data(),
        todos_userEmail_Doc.id
      );

      const todos_userEmail_taskId_Data =
        await todos_userEmail_taskId_Collection.get();
      console.log(
        '%c todos_userEmail_taskId_Collection==== ',
        'background-color: teal',
        todos_userEmail_taskId_Data,
        todos_userEmail_taskId_Collection.id
      );

      const todos_userEmail_taskId_info_data =
        await todos_userEmail_taskId_info_Doc.get();
      console.log(
        '%c todos_userEmail_taskId_info_Doc==== ',
        'background-color: mageta',
        todos_userEmail_taskId_info_data.data(),
        todos_userEmail_taskId_info_Doc.id
      );
    };

    onAwaitGets();

    // 무스마
    // 목요일 오후 1시반
    // 서초구 교대 서울 지사

    const subscriber = todos_Collection.onSnapshot((querySnapshot) => {
      console.log('querySnapshot ==== update', querySnapshot);

      let newDoc: TTodo[] = [];
      querySnapshot.forEach((doc) => {
        const todo = doc.data() as TTodo;
        doc.id;

        console.log('todo ==== todo', doc.id, todo);

        newDoc.push(todo);
      });

      setTodos(newDoc);
    });

    return () => subscriber();
  }, []);

  return (
    <View style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <Text>Temporary Test Screen for Firestore</Text>
      <ScrollView>
        <Text>List of Todos</Text>

        {todos.map((todo, index) => (
          <View key={index}></View>
          // <TodoCard
          //   key={index}
          //   index={index}
          //   todo={todo}
          //   onPressTodoCardToModify={() => {}}
          // />
        ))}
      </ScrollView>
      <InlineTextButton
        title="delete all data"
        onPress={async () => {
          await todos_Collection.doc(String(todos[0].id)).delete();
          console.log('User deleted!');
        }}
      />
      <InlineTextButton title="Load Todos" onPress={() => {}} />
      <InlineTextButton title="Load Todos" onPress={() => {}} />
    </View>
  );
};

export default TodosFirestoreScrn;
