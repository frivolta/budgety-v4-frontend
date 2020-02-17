// action strings
export const ADD_EXPENSE_TYPE_FILTER = "ADD_EXPENSE_TYPE_FILTER";
export const REMOVE_EXPENSE_TYPE_FILTER = "REMOVE_EXPENSE_TYPE_FILTER";
export const CLEAR_EXPENSE_TYPE_FILTER = "CLEAR_EXPENSE_TYPE_FILTER";

export interface addExpenseTypeFilter {
  type: typeof ADD_EXPENSE_TYPE_FILTER;
  filter: string;
}

export interface removeExpenseTypeFilter {
  type: typeof REMOVE_EXPENSE_TYPE_FILTER;
  filter: string;
}

export interface clearExpenseTypeFilter {
  type: typeof CLEAR_EXPENSE_TYPE_FILTER;
}

export type staticFiltersActionType =
  | addExpenseTypeFilter
  | removeExpenseTypeFilter
  | clearExpenseTypeFilter;
