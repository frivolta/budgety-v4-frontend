import { ADD_FILTERED_EXPENSES, CLEAR_FILTERED_EXPENSES } from "../../types/expenseActionTypes";
import { ExpenseType } from "../../types";
import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { Dispatch } from "redux";

const addFilteredExpenses = (expenses: ExpenseType[]): AppActions => ({
  type: ADD_FILTERED_EXPENSES,
  expenses
});

const clearFilteredExpenses = (): AppActions => ({
  type: CLEAR_FILTERED_EXPENSES
});

export const startAddFilteredExpenses = (expenses: ExpenseType[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(addFilteredExpenses(expenses));
  };
};

export const startClearFilteredExpenses = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(clearFilteredExpenses());
  };
};
