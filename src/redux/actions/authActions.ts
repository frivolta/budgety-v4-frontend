import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../../types/authActionTypes";
import axios, { AxiosError } from "axios";

import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { IApiUserDetails } from "../../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setUserToLocalStorage, removeUserFromLocalStorage } from "../../utils/authentication/auth.utils";

export interface IStartLogin {
  (email: string, password: string): ThunkAction<void, AppState, unknown, Action<string>>;
}

export interface IStartRefreshLogin {
  (user: IApiUserDetails): ThunkAction<void, AppState, unknown, Action<string>>;
}

export interface IStartLogout {
  (): ThunkAction<void, AppState, unknown, Action<string>>;
}

const loginRequest = (): AppActions => ({
  type: LOGIN_REQUEST
});

const loginSuccess = (user: IApiUserDetails): AppActions => ({
  type: LOGIN_SUCCESS,
  user
});

const loginFailure = (error: AxiosError): AppActions => ({
  type: LOGIN_FAILURE,
  error: { message: error.message, hasErrors: true }
});

const logout = (): AppActions => ({
  type: LOGOUT
});

//@ToDo: Fix this function
export const startLogin: IStartLogin = (email, password) => async dispatch => {
  dispatch(loginRequest());
  try {
    const request = await axios.post<IApiUserDetails>("http://localhost:3001/v1/auth/login", { email, password });
    setUserToLocalStorage(request.data);
    dispatch(loginSuccess(request.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const startRefreshLogin: IStartRefreshLogin = user => async dispatch => {
  dispatch(loginSuccess(user));
};

export const startLogout: IStartLogout = () => async dispatch => {
  removeUserFromLocalStorage();
  dispatch(logout());
};
