import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface IProps {}

function TodosMainScrn({}: IProps) {
	const todoList = useAppSelector((state) => state.todos);
	const dispatch = useAppDispatch();
	return (
		<View style={{}}>
			<Text>TodosMainScrn</Text>
		</View>
	);
}

export default TodosMainScrn;
