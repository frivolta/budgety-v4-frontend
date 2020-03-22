import { ADD_FILTERED_EXPENSES, CLEAR_FILTERED_EXPENSES, expenseActionTypes } from "../../types/expenseActionTypes";
import { ExpenseType } from "../../types";

interface IExpensesState {
  filteredExpenses: ExpenseType[];
}

const staticFiltersDefaultState: IExpensesState = {
  filteredExpenses: []
};

const expensesReducer = (state = staticFiltersDefaultState, action: expenseActionTypes): IExpensesState => {
  switch (action.type) {
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
