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

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
})


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

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
            
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
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }

        case 'SORT_BY_AMOUNT': 
            return {
                ...state,
                sortBy: 'amount'
            }
        
        case 'SORT_BY_DATE': 
            return {
                ...state,
                sortBy: 'date'
            }
        
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
            
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }    
            
        default:
            return state;
    }
};


const getVisibileExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1 
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    });
};


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibileExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expense1 = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 1000 }));
const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 30, createdAt: -1000 }));
const expense3 = store.dispatch(addExpense({description: 'Reptile', amount: 20, createdAt: 500 }));

// store.dispatch(removeExpense({id: expense2.expense.id}));
// store.dispatch(editExpense(expense1.expense.id, {amount: 50}));
// store.dispatch(setTextFilter('re'));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-1250));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(150));

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
