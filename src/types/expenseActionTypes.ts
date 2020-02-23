import { ExpenseType } from "../types";

// action strings
export const ADD_EXPENSE_TYPE_FILTER = "ADD_EXPENSE_TYPE_FILTER";
export const REMOVE_EXPENSE_TYPE_FILTER = "REMOVE_EXPENSE_TYPE_FILTER";
export const CLEAR_EXPENSE_TYPE_FILTER = "CLEAR_EXPENSE_TYPE_FILTER";

export const ADD_ALL_EXPENSES = "ADD_ALL_EXPENSES";
export const CLEAR_ALL_EXPENSES = "CLEAR_ALL_EXPENSES";
export const ADD_FILTERED_EXPENSES = "ADD_FILTERED_EXPENSES";
export const CLEAR_FILTERED_EXPENSES = "CLEAR_FILTERED_EXPENSES";

// All Expenses Actions
export interface addAllExpenses {
  type: typeof ADD_ALL_EXPENSES;
  expenses: ExpenseType[];
}

export interface clearAllExpenses {
  type: typeof CLEAR_ALL_EXPENSES;
}

// Filtered Expenses Actions
export interface addFilteredExpenses {
  type: typeof ADD_FILTERED_EXPENSES;
  expenses: ExpenseType[];
}

export interface clearFilteredExpenses {
  type: typeof CLEAR_FILTERED_EXPENSES;
}

export type expenseActionTypes =
  | addAllExpenses
  | clearAllExpenses
  | addFilteredExpenses
  | clearFilteredExpenses;
