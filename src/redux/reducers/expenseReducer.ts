import { ExpenseType } from "../../types";
import {
  expensesActionsTypes,
  expenseActionsType,
  IErrorExpense,
  EXPENSES_ALL_SUCCESS,
  EXPENSE_ADD_SUCCESS,
  EXPENSE_DELETE_SUCCESS,
  EXPENSES_SET_ERRORS,
  EXPENSES_CLEAR_ERRORS,
  EXPENSES_LOADING
} from "../../types/expensesActionTypes";

export interface IExpenseState {
  expenses: ExpenseType[];
  isLoading: boolean;
  loadingType: expenseActionsType | undefined;
  error: IErrorExpense;
}

const expensesDefaultState: IExpenseState = {
  expenses: [],
  isLoading: false,
  loadingType: undefined,
  error: { hasErrors: false, message: undefined, errorType: undefined }
};

const expenseReducer = (state = expensesDefaultState, action: expensesActionsTypes): IExpenseState => {
  switch (action.type) {
    case EXPENSES_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        loadingType: action.loadingType
      };
    case EXPENSES_CLEAR_ERRORS:
      return {
        ...state,
        error: { hasErrors: false, message: undefined, errorType: undefined }
      };
    case EXPENSES_SET_ERRORS:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        loadingType: undefined
      };
    case EXPENSES_ALL_SUCCESS:
      return {
        ...state,
        expenses: action.expenses,
        isLoading: false,
        loadingType: undefined
      };
    case EXPENSE_ADD_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.concat(action.expense),
        isLoading: false,
        loadingType: undefined
      };
    case EXPENSE_DELETE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.expenseId),
        isLoading: false,
        loadingType: undefined
      };
    default:
      return state;
  }
};

export { expenseReducer };
