import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import TodosMainScrn from './src/screens/todos/TodosMainScrn';

interface IProps {}

function App({}: IProps) {
	return (
		<Provider store={store}>
			<TodosMainScrn />
		</Provider>
	);
}

export default App;
