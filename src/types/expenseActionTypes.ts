import { ExpenseType } from "../types";

// action strings
export const ADD_EXPENSE_TYPE_FILTER = "ADD_EXPENSE_TYPE_FILTER";
export const REMOVE_EXPENSE_TYPE_FILTER = "REMOVE_EXPENSE_TYPE_FILTER";
export const CLEAR_EXPENSE_TYPE_FILTER = "CLEAR_EXPENSE_TYPE_FILTER";

export const ADD_FILTERED_EXPENSES = "ADD_FILTERED_EXPENSES";
export const REMOVE_FILTERED_EXPENSE = "REMOVE_FILTERED_EXPENSE";
export const CLEAR_FILTERED_EXPENSES = "CLEAR_FILTERED_EXPENSES";

export interface removeExpense {
  type: typeof REMOVE_FILTERED_EXPENSE;
}

// Filtered Expenses Actions
export interface addFilteredExpenses {
  type: typeof ADD_FILTERED_EXPENSES;
  expenses: ExpenseType[];
}

export interface clearFilteredExpenses {
  type: typeof CLEAR_FILTERED_EXPENSES;
}

export type expenseActionTypes = addFilteredExpenses | clearFilteredExpenses;
