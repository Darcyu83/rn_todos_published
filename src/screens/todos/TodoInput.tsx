import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { OrangeTouchable, SectionTitle } from '../../styles/styledComponents/components';

const Container = styled.View`
	border: 1px solid black;
`;

interface IProps {}

function TodoInput({}: IProps) {
	const [todoTitle, setTodoTitle] = useState('');
	const [todoContent, setTodoContent] = useState('');
	const dispatch = useAppDispatch();
	const onAddTodoHandler = () => {
		if (!todoTitle) return;
		dispatch(todosActions.addTodo({ id: new Date().getTime(), title: todoTitle, todo: todoContent }));
		setTodoTitle('');
		setTodoContent('');
	};

	return (
		<Container>
			<SectionTitle>Title</SectionTitle>
			<TextInput value={todoTitle} onChangeText={(txt) => setTodoTitle(txt)} />
			<SectionTitle>Content</SectionTitle>
			<TextInput value={todoContent} onChangeText={setTodoContent} />
			<OrangeTouchable onPress={onAddTodoHandler}>
				<SectionTitle>Click to Add</SectionTitle>
			</OrangeTouchable>
		</Container>
	);
}

export default TodoInput;
