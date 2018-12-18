import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = (
    {
        description="", note="", amount="", createdAt=0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
}); 

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense      
            ];

        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);

        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    console.log(store.getState());
})

const expense1 = store.dispatch(addExpense({description: 'Rent', amount: 100 }));
const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 30 }));

store.dispatch(removeExpense({id: expense2.expense.id}));

const demoState = {
    expenses: [{
        id: 'one',
        description: 'Jan Rent',
        note: 'final payment for that address',
        amount: 47500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

