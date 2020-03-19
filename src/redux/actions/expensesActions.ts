import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../../types/authActionTypes";
import {
  EXPENSE_ADD_SUCCESS,
  EXPENSES_ALL_SUCCESS,
  EXPENSE_DELETE_SUCCESS,
  EXPENSES_CLEAR_ERRORS,
  EXPENSES_LOADING,
  EXPENSES_SET_ERRORS,
  expenseActionsType,
  IErrorExpense
} from "../../types/expensesActionTypes";
import axios, { AxiosError } from "axios";

import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { ExpenseType } from "../../types";

export interface startGetAllExpenses {
  (): ThunkAction<void, AppState, unknown, Action<string>>;
}

const expensesAllSuccess = (expenses: ExpenseType[]): AppActions => ({
  type: EXPENSES_ALL_SUCCESS,
  expenses
});

const expenseAddSuccess = (expense: ExpenseType): AppActions => ({
  type: EXPENSE_ADD_SUCCESS,
  expense
});

const expenseDeleteSuccess = (expenseId: string): AppActions => ({
  type: EXPENSE_DELETE_SUCCESS,
  expenseId
});

const expensesLoading = (loadingType: expenseActionsType, isLoading: boolean): AppActions => ({
  type: EXPENSES_LOADING,
  loadingType,
  isLoading
});

const setErrors = (error: IErrorExpense): AppActions => ({
  type: EXPENSES_SET_ERRORS,
  error
});

const clearErrors = (): AppActions => ({
  type: EXPENSES_CLEAR_ERRORS
});

// Get all expenses
export const startGetAllExpenses: startGetAllExpenses = () => async dispatch => {
  dispatch(clearErrors());
  dispatch(expensesLoading(expenseActionsType.ALL, true));
  try {
    const request = await axios.get<ExpenseType[]>("http://localhost:3001/v1/expenses");
    dispatch(expensesAllSuccess(request.data));
  } catch (err) {
    const composedError: IErrorExpense = { message: err.message, hasErrors: true, errorType: expenseActionsType.ALL };
    dispatch(setErrors(composedError));
  }
};
