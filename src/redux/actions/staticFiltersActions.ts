import {
  ADD_EXPENSE_TYPE_FILTER,
  CLEAR_EXPENSE_TYPE_FILTER,
  REMOVE_EXPENSE_TYPE_FILTER
} from "../../types/staticFiltersActions";
import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { Dispatch } from "redux";

// Actions
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

//Dispatch actions

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
