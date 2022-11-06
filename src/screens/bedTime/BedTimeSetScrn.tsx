import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect, Circle, Path, G } from 'react-native-svg';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../styles/constants';

import firestore from '@react-native-firebase/firestore';
import InlineTextButton from '../../components/bottons/InlineTextButton';
import { TTodo } from '../../redux/todos/types';
import TodoCard from '../todos/TodoCard';

const BedTimeSetScrn = ({}: any) => {
  const todosCollection = firestore().collection('todos');

  const [todos, setTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    console.log('todosCollection.id ==== ', todosCollection.id);
    todosCollection.id;
    const subscriber = todosCollection.onSnapshot((querySnapshot) => {
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
    <View>
      <Text>Temporary Test Screen for Firestore</Text>
      <ScrollView>
        <Text>List of Todos</Text>

        {todos.map((todo, index) => (
          <TodoCard
            key={index}
            index={index}
            todo={todo}
            onPressTodoCardToModify={() => {}}
          />
        ))}
      </ScrollView>
      <InlineTextButton
        title="delete all data"
        onPress={async () => {
          await todosCollection.doc(String(todos[0].id)).delete();
          console.log('User deleted!');
        }}
      />
      <InlineTextButton title="Load Todos" onPress={() => {}} />
      <InlineTextButton title="Load Todos" onPress={() => {}} />
    </View>
  );
};

export default BedTimeSetScrn;
