import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from "../../types/authActionTypes";
import axios, { AxiosError } from "axios";

import { AppActions } from "../../types/appActions";
import { AppState } from "../configureStore";
import { IApiUserDetails } from "../../types";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setUserToLocalStorage, removeUserFromLocalStorage } from "../../utils/authentication/auth.utils";

export interface IStartLoginSignup {
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

const signupRequest = () => ({
  type: SIGNUP_REQUEST
});

const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

const signupFailure = (error: AxiosError) => ({
  type: SIGNUP_FAILURE,
  error: { message: error.message, hasErrors: true }
});

//@ToDo: Fix this function
export const startLogin: IStartLoginSignup = (email, password) => async dispatch => {
  dispatch(loginRequest());
  try {
    const request = await axios.post<IApiUserDetails>(`${process.env.REACT_APP_HOST}/auth/login`, { email, password });
    setUserToLocalStorage(request.data);
    dispatch(loginSuccess(request.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const startSignup: IStartLoginSignup = (email, password) => async dispatch => {
  try {
    dispatch(signupRequest());
    await axios.post<IApiUserDetails>(`${process.env.REACT_APP_HOST}/auth/register`, { email, password });
    dispatch(signupSuccess());
  } catch (err) {
    dispatch(signupFailure(err));
  }
};

export const startRefreshLogin: IStartRefreshLogin = user => async dispatch => {
  dispatch(loginSuccess(user));
};

export const startLogout: IStartLogout = () => async dispatch => {
  removeUserFromLocalStorage();
  dispatch(logout());
};
