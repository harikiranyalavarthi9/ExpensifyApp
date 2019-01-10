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

store.dispatch(addExpense({ description: 'Water Bill', note: 'Monthly Water Consumption', amount: 3799, createdAt: 10191}));
store.dispatch(addExpense({ description: 'Gas Bill', note: 'Monthly Gas Consumption', amount: 5999, createdAt: 2010}));
store.dispatch(addExpense({ description: 'Rent', note: 'Monthly Rent', amount: 45799, createdAt: 202027182}));
// store.dispatch(setTextFilter('wat'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000);

const state = store.getState();

const visibleExpenses = getVisibileExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
