import {
  ADD_EXPENSE_TYPE_FILTER,
  CLEAR_EXPENSE_TYPE_FILTER,
  REMOVE_EXPENSE_TYPE_FILTER,
  ADD_CATEGORY_TYPE_FILTER,
  CLEAR_CATEGORY_TYPE_FILTER,
  REMOVE_CATEGORY_TYPE_FILTER
} from '../../types/staticFiltersActions';
import { AppActions } from '../../types/appActions';
import { AppState } from '../configureStore';
import { Dispatch } from 'redux';

// Actions
// ExpenseTypeFilter
export const addExpenseTypeFilter = (filter: string): AppActions => ({
  type: ADD_EXPENSE_TYPE_FILTER,
  filter
});

export const removeExpenseTypeFilter = (filter: string): AppActions => ({
  type: REMOVE_EXPENSE_TYPE_FILTER,
  filter
});

export const clearExpenseTypeFilter = (): AppActions => ({
  type: CLEAR_EXPENSE_TYPE_FILTER
});

// CategoryTypeFilter
export const addCategoryTypeFilter = (filter: string): AppActions => ({
  type: ADD_CATEGORY_TYPE_FILTER,
  filter
});

export const removeCategoryTypeFilter = (filter: string): AppActions => ({
  type: REMOVE_CATEGORY_TYPE_FILTER,
  filter
});

export const clearCategoryTypeFilter = (): AppActions => ({
  type: CLEAR_CATEGORY_TYPE_FILTER
});

//Dispatch actions
// ExpenseTypeFilter
export const startAddExpenseTypeFilter = (filter: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(addExpenseTypeFilter(filter));
  };
};

export const startRemoveExpenseTypeFilter = (filter: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(removeExpenseTypeFilter(filter));
  };
};
export const startClearExpenseTypeFilter = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(clearExpenseTypeFilter());
  };
};

// CategoryTypeFilter
export const startAddCategoryTypeFilter = (filter: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(addCategoryTypeFilter(filter));
  };
};

export const startRemoveCategoryTypeFilter = (filter: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(removeCategoryTypeFilter(filter));
  };
};
export const startClearCategoryTypeFilter = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(clearCategoryTypeFilter());
  };
};
