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
import { toasterInfo, toasterError } from "../../utils/showToaster";
import { SUCCESS, ERRORS } from "../../utils/messages";
import { History } from "history";

export interface IStartLoginSignup {
  (email: string, password: string, history: History): ThunkAction<void, AppState, unknown, Action<string>>;
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
export const startLogin: IStartLoginSignup = (email, password, history) => async dispatch => {
  dispatch(loginRequest());
  try {
    const request = await axios.post<IApiUserDetails>(`${process.env.REACT_APP_HOST}/auth/login`, { email, password });
    setUserToLocalStorage(request.data);
    dispatch(loginSuccess(request.data));
    toasterInfo(SUCCESS.signinSuccess);
    history.push("/");
  } catch (err) {
    dispatch(loginFailure(err));
    toasterError(ERRORS.signinFailed);
    console.error("Signup error: ", err);
  }
};

export const startSignup: IStartLoginSignup = (email, password, history) => async dispatch => {
  try {
    dispatch(signupRequest());
    await axios.post<IApiUserDetails>(`${process.env.REACT_APP_HOST}/auth/register`, { email, password });
    dispatch(signupSuccess());
    toasterInfo(SUCCESS.signupSuccess);
    history.push("/signin");
  } catch (error) {
    toasterError(ERRORS.signupFailed);
    error.response ? dispatch(signupFailure(error.response.data)) : dispatch(signupFailure(error));
    console.log(error);
  }
};

export const startRefreshLogin: IStartRefreshLogin = user => async dispatch => {
  dispatch(loginSuccess(user));
};

export const startLogout: IStartLogout = () => async dispatch => {
  removeUserFromLocalStorage();
  dispatch(logout());
};
