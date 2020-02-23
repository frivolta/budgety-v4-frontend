import {
  ADD_ALL_EXPENSES,
  ADD_FILTERED_EXPENSES,
  CLEAR_ALL_EXPENSES,
  CLEAR_FILTERED_EXPENSES
} from "../../types/expenseActionTypes";
import { ExpenseType } from "../../types";
import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { Dispatch } from "redux";

const addAllExpenses = (expenses: ExpenseType[]): AppActions => ({
  type: ADD_ALL_EXPENSES,
  expenses
});

const addFilteredExpenses = (expenses: ExpenseType[]): AppActions => ({
  type: ADD_FILTERED_EXPENSES,
  expenses
});

const clearAllExpenses = (): AppActions => ({
  type: CLEAR_ALL_EXPENSES
});

const clearFilteredExpenses = (): AppActions => ({
  type: CLEAR_FILTERED_EXPENSES
});

export const startAddAllExpenses = (expenses: ExpenseType[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(addAllExpenses(expenses));
  };
};

export const startAddFilteredExpenses = (expenses: ExpenseType[]) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(addFilteredExpenses(expenses));
  };
};

export const startClearAllExpenses = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(clearAllExpenses());
  };
};

export const startClearFilteredExpenses = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(clearFilteredExpenses());
  };
};
