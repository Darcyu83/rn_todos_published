import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch } from '../../redux/hooks';
import { todosActions } from '../../redux/todos/todosSlice';
import { TTodo } from '../../redux/todos/types';
import { OrangeTouchable, SectionTitle } from '../../styles/styledComponents/components';

const Container = styled.View`
	background-color: rgba(30, 144, 255, 0.5);
	margin: 5px 0px;
`;

const RowContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

interface IProps {
	todo: TTodo;
	index: number;
}

function TodoCard({ todo, index }: IProps) {
	const dispatch = useAppDispatch();
	const onRemoveTodohandler = () => {
		dispatch(todosActions.removeTodo(todo));
	};
	return (
		<Container>
			<RowContainer>
				<SectionTitle>
					{index}.{todo.title}
				</SectionTitle>
				<OrangeTouchable onPress={onRemoveTodohandler}>
					<Text>DEL</Text>
				</OrangeTouchable>
			</RowContainer>
			<Text numberOfLines={1} ellipsizeMode="tail">
				{todo.todo}
			</Text>
		</Container>
	);
}

export default TodoCard;
