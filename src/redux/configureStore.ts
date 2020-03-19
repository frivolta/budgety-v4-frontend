import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { staticFiltersReducer } from "./reducers/staticFiltersReducer";
import { expensesReducer } from "./reducers/expensesReducer";
import { authReducer } from "./reducers/authReducer";
import { expenseReducer } from "./reducers/expenseReducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/appActions";

export const rootReducer = combineReducers({
  filters: staticFiltersReducer,
  expense: expenseReducer,
  expenses: expensesReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
);
