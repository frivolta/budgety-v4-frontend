import {
  ADD_ALL_EXPENSES,
  CLEAR_ALL_EXPENSES,
  ADD_FILTERED_EXPENSES,
  CLEAR_FILTERED_EXPENSES,
  expenseActionTypes
} from "../../types/expenseActionTypes";
import { ExpenseType } from "../../types";

interface IExpensesState {
  allExpenses: ExpenseType[];
  filteredExpenses: ExpenseType[];
}

const staticFiltersDefaultState: IExpensesState = {
  allExpenses: [],
  filteredExpenses: []
};

const expensesReducer = (state = staticFiltersDefaultState, action: expenseActionTypes): IExpensesState => {
  switch (action.type) {
    case ADD_ALL_EXPENSES:
      return {
        ...state,
        allExpenses: action.expenses
      };
    case CLEAR_ALL_EXPENSES:
      return {
        ...state,
        allExpenses: []
      };
    case ADD_FILTERED_EXPENSES:
      return {
        ...state,
        filteredExpenses: action.expenses
      };
    case CLEAR_FILTERED_EXPENSES:
      return {
        ...state,
        filteredExpenses: []
      };
    default:
      return state;
  }
};

export { expensesReducer };
