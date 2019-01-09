import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibileExpenses from './selectors/expensesSelector';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', note: 'Monthly Water Consumption', amount: 37.99, createdAt: '1/9/2019'}));
store.dispatch(addExpense({ description: 'Gas Bill', note: 'Monthly Gas Consumption', amount: 59.99, createdAt: '01/16/2019'}));
store.dispatch(setTextFilter('wat'));

setTimeout(() => {
    store.dispatch(setTextFilter('bill'));
}, 3000);

const state = store.getState();

const visibleExpenses = getVisibileExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
