import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ScrnTitle } from '../../styles/styledComponents/components';
import CircularScheduleTable from './circularTable/CircularScheduleTable';

import TodoCard from './TodoCard';
import TodoInput from './TodoInput';

const Container = styled.View`
  padding: 10px;
`;

interface IProps {}

function TodosMainScrn({}: IProps) {
  const todoList = useAppSelector((state) => state.todos.list);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {/* <CircularScheduleTable /> */}
        <ScrnTitle>TodosMainScrn</ScrnTitle>
        <TodoInput />
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TodoCard index={index} todo={item} />
          )}
        />

        <CircularScheduleTable />
      </Container>
    </SafeAreaView>
  );
}

export default TodosMainScrn;
