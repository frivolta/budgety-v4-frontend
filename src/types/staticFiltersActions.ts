// action strings
export const ADD_EXPENSE_TYPE_FILTER = 'ADD_EXPENSE_TYPE_FILTER';
export const REMOVE_EXPENSE_TYPE_FILTER = 'REMOVE_EXPENSE_TYPE_FILTER';
export const CLEAR_EXPENSE_TYPE_FILTER = 'CLEAR_EXPENSE_TYPE_FILTER';
export const ADD_CATEGORY_TYPE_FILTER = 'ADD_CATEGORY_TYPE_FILTER';
export const REMOVE_CATEGORY_TYPE_FILTER = 'REMOVE_CATEGORY_TYPE_FILTER';
export const CLEAR_CATEGORY_TYPE_FILTER = 'CLEAR_CATEGORY_TYPE_FILTER';

// ExpenseTypeFilter
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
export interface addCategroyTypeFilter {
  type: typeof ADD_CATEGORY_TYPE_FILTER;
  filter: string;
}

export interface removeCategroyTypeFilter {
  type: typeof REMOVE_CATEGORY_TYPE_FILTER;
  filter: string;
}

export interface clearCategroyTypeFilter {
  type: typeof CLEAR_CATEGORY_TYPE_FILTER;
}

export type staticFiltersActionType =
  | addExpenseTypeFilter
  | removeExpenseTypeFilter
  | clearExpenseTypeFilter
  | addCategroyTypeFilter
  | removeCategroyTypeFilter
  | clearCategroyTypeFilter;
