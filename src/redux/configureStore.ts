import { createStore, combineReducers, applyMiddleware } from "redux";
import { staticFiltersReducer } from "./reducers/staticFiltersReducer";
//import { AppActions } from "../types/appActions";

export const rootReducer = combineReducers({
  filters: staticFiltersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
