import { ExpenseType, IError } from "../types";

// Fetching actions strings
export const EXPENSES_ALL_SUCCESS = "EXPENSES_ALL_SUCCESS";
export const EXPENSE_ADD_SUCCESS = "EXPENSE_ADD_SUCCESS";
export const EXPENSE_DELETE_SUCCESS = "EXPENSE_DELETE_SUCCESS";
// Fetching statuses strings
export const EXPENSES_SET_ERRORS = "EXPENSES_SET_ERRORS";
export const EXPENSES_CLEAR_ERRORS = "EXPENSES_CLEAR_ERRORS";
export const EXPENSES_LOADING = "EXPENSES_LOADING";

export enum expenseActionsType {
  ALL,
  ADD,
  DELETE
}

export interface IErrorExpense extends IError {
  errorType: expenseActionsType | undefined;
}

// Expenses Actions
export interface expensesLoading {
  type: typeof EXPENSES_LOADING;
  loadingType: expenseActionsType | undefined;
  isLoading: boolean;
}

export interface setErrors {
  type: typeof EXPENSES_SET_ERRORS;
  error: IErrorExpense;
}

export interface clearErrors {
  type: typeof EXPENSES_CLEAR_ERRORS;
}

export interface expensesAllSuccess {
  type: typeof EXPENSES_ALL_SUCCESS;
  expenses: ExpenseType[];
}

export interface expenseAddSuccess {
  type: typeof EXPENSE_ADD_SUCCESS;
  expense: ExpenseType;
}

export interface expenseDeleteSuccess {
  type: typeof EXPENSE_DELETE_SUCCESS;
  expenseId: string;
}

export type expensesActionsTypes =
  | expensesLoading
  | setErrors
  | clearErrors
  | expensesAllSuccess
  | expenseAddSuccess
  | expenseDeleteSuccess;
