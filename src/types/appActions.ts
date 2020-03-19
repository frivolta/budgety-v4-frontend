import { staticFiltersActionType } from "./staticFiltersActions";
import { expenseActionTypes } from "./expenseActionTypes";
import { expensesActionsTypes } from "./expensesActionTypes";
import { authActionTypes } from "./authActionTypes";

export type AppActions = staticFiltersActionType | expenseActionTypes | authActionTypes | expensesActionsTypes;
