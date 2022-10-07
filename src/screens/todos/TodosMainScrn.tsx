import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ScrnTitle } from '../../styles/styledComponents/components';
import CircularScheduleTable from './CircularScheduleTable';
import RotateTest from './RotateTest';
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
					renderItem={({ item, index }) => <TodoCard index={index} todo={item} />}
				/>

				<RotateTest />

				{/* <View style={{ width: '100%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							borderRadius: 9999,
							// overflow: 'hidden',
							width: 160,
							height: 160,
							backgroundColor: 'teal',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<View style={{ backgroundColor: 'blue', width: 10, height: 10 }}>
							<View
								style={{
									position: 'absolute',

									transform: [
										{ translateX: 5 },
										{ translateY: 5 },
										{ rotateX: '50deg' },
										{ rotateZ: '40deg' },
										{ perspective: 400 },
									],

									width: 160,
									height: 160,
									backgroundColor: 'yellow',
								}}
							/>
						</View>
					</View>
				</View> */}
			</Container>
		</SafeAreaView>
	);
}

export default TodosMainScrn;
