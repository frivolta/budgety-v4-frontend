import { IApiUserDetails, IError } from '../types';

// Action strings
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

// Authentication actions
export interface loginRequest {
  type: typeof LOGIN_REQUEST;
}

export interface loginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: IApiUserDetails;
}

export interface loginFailure {
  type: typeof LOGIN_FAILURE;
  error: IError;
}

export interface logout {
  type: typeof LOGOUT;
}

export type authActionTypes = loginRequest | loginSuccess | loginFailure | logout;
